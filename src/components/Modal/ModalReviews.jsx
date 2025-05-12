import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import styles from "./ModalReviews.module.scss";
import { getBookingsByUserId } from "@api/bookingApi";
import { createCompanyReview } from "@api/reviewsApi";
import Modal from "@components/UI/Modal/Modal";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import emptyStar from "../../assets/images/empty-star-icon.svg";
import filledStar from "../../assets/images/filled-star-icon.svg";

const ModalReviews = ({ isOpen, onClose }) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?.id;

  const [bookings, setBookings] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [startDate, setStartDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    if (!userId || !isOpen) return;

    const fetchBookings = async () => {
      try {
        const res = await getBookingsByUserId(userId);
        setBookings(res.booking);
      } catch (err) {
        setError("Не вдалося завантажити букінги", err);
      }
    };

    fetchBookings();
  }, [userId, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hotelId || !comment || !startDate) {
      setError("Будь ласка, заповніть усі поля");
      return;
    }

    if (!availableDates.includes(startDate)) {
      setError("Оберіть дату, яка відповідає вибраному готелю");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await createCompanyReview({
        user_id: userId,
        hotel_id: hotelId,
        rating: Number(rating),
        comment,
        start_date: startDate,
      });
      onClose();
      toast.success("Відгук успішно створено");
    } catch (err) {
      setError("Помилка при надсиланні відгуку", err);
      toast.error("Сталась помилка під час творення відгуку");
    } finally {
      setLoading(false);
    }
  };

  const handleHotelChange = (e) => {
    const selectedHotelId = e.target.value;
    setHotelId(selectedHotelId);
    setStartDate("");

    const dates = bookings
      .filter((b) => b.Hotel && b.Hotel.id.toString() === selectedHotelId)
      .map((b) => b.start_date);

    setAvailableDates(dates);
  };

  const uniqueHotels = Array.from(
    new Map(
      bookings.filter((b) => b.Hotel).map((b) => [b.Hotel.id, b.Hotel])
    ).values()
  );

  return (
    <Modal
      modalClassName={styles["modal-reviews"]}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={styles.modal}>
        <h2 className={styles["title"]}>Будемо раді вашому відгуку</h2>
        <form onSubmit={handleSubmit} className={styles["form"]}>
          <select
            value={hotelId}
            onChange={handleHotelChange}
            className={styles["input"]}
          >
            <option value="">Оберіть готель</option>
            {uniqueHotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} ({hotel.country})
              </option>
            ))}
          </select>
          <select
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
            disabled={!hotelId}
          >
            <option value="">Оберіть дату</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={styles["textarea"]}
            rows={4}
            placeholder="Коментар"
          />
          <div className={styles["stars-label"]}>
            <div className={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={styles["star-icon-button"]}
                  onClick={() => setRating(star)}
                  aria-label={`Set rating to ${star} star`}
                >
                  <img
                    src={star <= rating ? filledStar : emptyStar}
                    alt={`${star} зірка`}
                    className={styles["star-icon"]}
                  />
                </button>
              ))}
            </div>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={styles["submit-button"]}
            >
              {loading ? "Надсилання..." : "Відправити"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

ModalReviews.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalReviews;
