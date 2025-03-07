import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { getBookingsByUserId, cancelBooking } from "@api/bookingApi";
import { useSelector } from "react-redux";
import { formatMonthDayYear } from "@utils/formatDate";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { animationsProfile } from "./animations";

const TabBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);
  const userId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookingsByUserId(userId);
        setBookings(data.booking);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  const handleCancelBooking = async (bookingId) => {
    try {
      setCancelingId(bookingId);
      await cancelBooking(bookingId);
      setBookings(
        bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "скасовано" }
            : booking
        )
      );
      toast.success("Бронювання успішно скасовано");
    } catch (err) {
      setError(err.message);
      toast.error("Сталась помилка під час скасування");
    } finally {
      setCancelingId(null);
    }
  };

  const sortedBookings = [...bookings].sort((a, b) => {
    const activeStatuses = ["очікується", "підтверджено"];
    const aIsActive = activeStatuses.includes(a.status);
    const bIsActive = activeStatuses.includes(b.status);
    if (aIsActive && !bIsActive) return -1;
    if (!aIsActive && bIsActive) return 1;
    return new Date(b.last_modified) - new Date(a.last_modified);
  });

  console.log(bookings);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <motion.section
      className={styles["booking-section"]}
      initial="hidden"
      animate="visible"
      variants={animationsProfile.tab}
    >
      <h2>Мої бронювання</h2>
      {bookings.length === 0 ? (
        <p>У вас немає бронювань</p>
      ) : (
        <div>
          {sortedBookings.map((booking) => (
            <div key={booking.id} className={styles["booking-card"]}>
              <h3>{booking.Hotel?.name}</h3>
              <p>
                {booking.Hotel?.country}, {booking.Hotel?.city}
              </p>
              <p>
                Кількість туристів:{" "}
                {booking.number_of_children + booking.number_of_tourists}
              </p>
              <p>Тип кімнати: {booking.HotelRoomType?.name}</p>
              <p>Тип харчування: {booking.HotelMealType?.type_name}</p>
              <p>Загальна ціна: {booking.total_price}</p>
              <p>Статус: {booking.status}</p>
              <time>{formatMonthDayYear(booking.last_modified)}</time>
              <div className={styles["buttons"]}>
                {booking.status !== "скасовано" &&
                  booking.status !== "завершено" && (
                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancelingId === booking.id}
                      className={styles["cancel-button"]}
                    >
                      {cancelingId === booking.id
                        ? "Скасування..."
                        : "Скасувати бронювання"}
                    </button>
                  )}
                {booking.status === "підтверджено" && (
                  <button className={styles["fill-details-btn"]}>
                    Заповнити дані
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default TabBooking;
