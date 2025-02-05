import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ModalRating.module.scss";
import Modal from "@components/UI/Modal/Modal";
import Pagination from "@components/Pagination/Pagination";
import { getHotelReviews } from "@api/hotelReviewsApi";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { SkeletonReviewsHotel } from "@components/Skeleton/SkeletonReviewsHotel";
import { formatShortMonthDayYear } from "@utils/formatDate";

const ModalRating = ({
  isOpen,
  onClose,
  averageRating,
  reviewCount,
  animation,
  beach,
  food,
  price,
  room,
  staff,
}) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    if (!isOpen) return;

    const fetchReviews = async () => {
      setLoading(true);
      try {
        const data = await getHotelReviews({ page, limit });
        console.log(data);
        setReviews(data.reviews);
        setTotalPages(
          isNaN(Math.ceil(data.totalCount / limit))
            ? 1
            : Math.ceil(data.totalCount / limit)
        );
      } catch {
        setError("Не вдалося завантажити відгуки");
      }
      setLoading(false);
    };

    fetchReviews();
  }, [isOpen, page]);

  let content;
  if (loading) {
    content = <SkeletonReviewsHotel />;
  } else if (error) {
    content = <ErrorMessage />;
  } else if (reviews.length === 0) {
    content = <p className={styles["no-reviews"]}>Відгуків поки що немає.</p>;
  } else {
    content = (
      <section className={styles["reviews-list"]}>
        {reviews.map((review) => (
          <div key={review.id} className={styles["review-item"]}>
            <div className={styles["review-meta"]}>
              <div className="flex items-center">
                <p className={styles["review-rating"]}>{review.rating}</p>
                <p className={styles["review-user"]}>
                  {review.user.first_name || "Анонім"}
                </p>
              </div>
              <time className={styles["review-date"]}>
                {formatShortMonthDayYear(review.created_at)}
              </time>
            </div>
            <p className={styles["comment"]}>{review.comment}</p>
          </div>
        ))}
      </section>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName={styles["overlay"]}
      modalClassName={styles["modal-rating"]}
      contentClassName={styles["content-rating"]}
    >
      <h2 className={styles["title"]}>Рейтинг готелю</h2>
      <p className={styles["review-info"]}>
        <span className={styles["rating"]}>{averageRating ?? 0}</span>{" "}
        {reviewCount} відгуків
      </p>
      <ul className={styles["rating-list"]}>
        {[
          { value: food, label: "Харчування" },
          { value: room, label: "Кімната" },
          { value: staff, label: "Персонал" },
          { value: price, label: "Ціна-якість" },
          beach > 0 && { value: beach, label: "Пляж" },
          { value: animation, label: "Анімації" },
        ]
          .filter((item) => item)
          .map((item, index) => (
            <li key={`${item.value}-${index + 1}`}>
              <span className={styles["rating-value"]}>{item.value}</span>{" "}
              {item.label}
            </li>
          ))}
      </ul>
      {content}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Modal>
  );
};

ModalRating.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  averageRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  animation: PropTypes.number.isRequired,
  beach: PropTypes.number.isRequired,
  food: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
  staff: PropTypes.number.isRequired,
};

export default ModalRating;
