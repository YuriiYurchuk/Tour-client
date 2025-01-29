import { useState, useEffect } from "react";
import ReviewsCard from "@components/Reviews/ReviewsCard";
import styles from "./SwiperReviews.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";
import { animationsHome } from "../animations";
import { getReviewsLatest } from "@api/reviewsApi";
import { SkeletonSwiperReviews } from "@components/Skeleton/SkeletonSwiperReviews";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";

const SwiperReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        const response = await getReviewsLatest();
        if (response.success) {
          setReviews(response.data);
        } else {
          setError("Помилка при завантаженні відгуків");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  let content;
  if (loading) {
    content = <SkeletonSwiperReviews />;
  } else if (error) {
    content = <ErrorMessage />;
  } else {
    content = (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsHome.swiper}
      >
        <Swiper
          modules={[Scrollbar]}
          spaceBetween={25}
          scrollbar={{ hide: false }}
          grabCursor={true}
          slidesPerView="auto"
          loop={true}
          className={styles["swiper"]}
        >
          {reviews.map((review) => (
            <SwiperSlide className={styles["swiper-slide"]} key={review.id}>
              <ReviewsCard
                userPhoto={`${imagesBaseUrl}${review.user.avatar_url}`}
                starRating={review.rating}
                firstName={review.user.first_name}
                city={review.hotel.country}
                hotelName={review.hotel.name}
                comment={review.comment}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    );
  }

  return (
    <section className="container">
      <header className={styles["header-reviews"]}>
        <div className={styles["reviews-text"]}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsHome.text}
          >
            Відгуки
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsHome.text}
          >
            Враження наших мандрівників
          </motion.p>
        </div>
        <motion.h3
          className={styles["reviews-title"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={animationsHome.title}
        >
          Reviews
        </motion.h3>
      </header>
      {content}
    </section>
  );
};

export default SwiperReviews;
