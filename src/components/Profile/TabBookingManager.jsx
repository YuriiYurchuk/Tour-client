import { useEffect, useState, useCallback } from "react";
import {
  getAllBookings,
  updateBookingStatus,
  getBookingDetails,
} from "@api/bookingApi";
import Pagination from "@components/Pagination/Pagination";
import { generateDOCX } from "@utils/docxGenerator";
import styles from "./Profile.module.scss";

const TabBookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await getAllBookings({
        page: currentPage,
        limit: 10,
        status,
      });
      setBookings(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Помилка отримання бронювань:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, status]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      fetchBookings();
    } catch (error) {
      setError("Не вдалося змінити статус бронювання", error);
    }
  };

  const fetchBookingDetails = async (bookingId) => {
    try {
      const response = await getBookingDetails(bookingId);
      generateDOCX(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Не вдалося отримати деталі бронювання", error);
    }
  };

  let content;

  if (bookings.length === 0) {
    content = <p>Немає доступних бронювань.</p>;
  } else {
    content = (
      <table className="table-auto w-full border-collapse border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Користувач</th>
            <th className="border px-4 py-2">Статус</th>
            <th className="border px-4 py-2">Дії</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{booking.id}</td>
              <td className="border px-4 py-2">{booking.user_id}</td>
              <td className="border px-4 py-2">{booking.status}</td>
              <td className="border px-4 py-2">
                {booking.status === "скасовано" ? (
                  <span>Бронювання скасовано</span>
                ) : (
                  <>
                    {booking.status === "очікується" && (
                      <>
                        <button
                          className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
                          onClick={() =>
                            handleStatusChange(booking.id, "підтверджено")
                          }
                        >
                          Підтвердити
                        </button>
                        <button
                          className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() =>
                            handleStatusChange(booking.id, "скасовано")
                          }
                        >
                          Скасувати
                        </button>
                      </>
                    )}
                    {booking.status === "підтверджено" && (
                      <button
                        className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() =>
                          handleStatusChange(booking.id, "скасовано")
                        }
                      >
                        Скасувати
                      </button>
                    )}
                    {booking.status === "дані заповнено" && (
                      <>
                        <button
                          className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() =>
                            handleStatusChange(booking.id, "скасовано")
                          }
                        >
                          Скасувати
                        </button>
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded"
                          onClick={() => fetchBookingDetails(booking.id)}
                        >
                          Деталі
                        </button>
                      </>
                    )}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles["title-manager"]}>Управління бронюваннями</h2>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="">Усі статуси</option>
        <option value="очікується">Очікується</option>
        <option value="підтверджено">Підтверджено</option>
        <option value="скасовано">Скасовано</option>
        <option value="дані заповнено">Дані заповнено</option>
      </select>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? <p>Завантаження...</p> : content}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TabBookingManager;
