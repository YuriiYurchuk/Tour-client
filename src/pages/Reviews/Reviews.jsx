import { useEffect, useState, useRef } from "react";
import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import ReviewsComponents from "@components/Reviews/ReviewsComponents";
import ReviewsCard from "@components/Reviews/ReviewsCard";
import Pagination from "@components/Pagination/Pagination";
import { getReviewsCompany } from "@api/reviewsApi";
import imgDesktop from "../../assets/images/Reviews/banner-reviews-desktop.webp";
import imgTablet from "../../assets/images/Reviews/banner-reviews-tablet.webp";
import imgMobile from "../../assets/images/Reviews/banner-reviews-mobile.webp";
import styles from "./Reviews.module.scss";
import { motion } from "framer-motion";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { SkeletonReviews } from "@components/Skeleton/SkeletonReviews";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const reviewsRef = useRef(null);

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getReviewsCompany(currentPage, 9);
        setReviews(data.data);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    if (triggeredByPagination && reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTriggeredByPagination(false);
    }
  }, [currentPage, triggeredByPagination]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setTriggeredByPagination(true);
  };

  let content;
  if (loading) {
    content = <SkeletonReviews />;
  } else if (error) {
    content = <ErrorMessage />;
  } else {
    content = (
      <div className={styles["reviews-list"]}>
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              y: { duration: 1, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <ReviewsCard
              userPhoto={`${imagesBaseUrl}${review.user.avatar_url}`}
              starRating={review.rating}
              firstName={review.user.first_name}
              city={review.hotel.country}
              hotelName={review.hotel.name}
              comment={review.comment}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <section className={styles["reviews"]}>
      <Banner
        title="Відгуки"
        subtitle="Історії наших мандрівників: Натхнення для наступної пригоди"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <section ref={reviewsRef} className="container">
        <ReviewsComponents />
        {content}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </section>
  );
};

export default ReviewsPage;
