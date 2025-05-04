import { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { getUserReview, deleteCompanyReview } from "@api/reviewsApi";
import { toast } from "react-toastify";
import { formatMonthDayYear } from "@utils/formatDate";
import { motion } from "framer-motion";
import { animationsProfile } from "./animations";

const TabReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      const response = await getUserReview();
      setReviews(response.data);
    } catch {
      setError("Не вдалося завантажити відгуки");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await deleteCompanyReview(reviewId);
      setReviews(reviews.filter((review) => review.id !== reviewId));
      toast.success("Відгук успішно видалено");
    } catch {
      toast.error("Не вдалося видалити відгук");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <p>Завантаження відгуків...</p>;
  if (error) return <p>{error}</p>;

  return (
    <motion.section
      className={styles["reviews-section"]}
      initial="hidden"
      animate="visible"
      variants={animationsProfile.tab}
    >
      <h2>Мої відгуки</h2>
      {reviews.length === 0 ? (
        <p>У вас немає відгуків</p>
      ) : (
        <div className={styles["reviews-list"]}>
          {reviews.map((review) => (
            <div key={review.id} className={styles["review-card"]}>
              <h3>{review.hotel.name}</h3>
              <p>Оцінка: {review.rating}</p>
              <p>Коментар: {review.comment}</p>
              <time>{formatMonthDayYear(review.created_at)}</time>
              <div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className={styles["delete-button"]}
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
};

export default TabReviews;
