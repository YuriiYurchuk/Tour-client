import { useState, useEffect, useRef } from "react";
import styles from "./AllHotels.module.scss";
import Pagination from "@components/Pagination/Pagination";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { SkeletonHotelsCardPage } from "@components/Skeleton/SkeletonHotelsCardPage";
import { getAllHotels } from "@api/getHotelApi";
import HotelCard from "@components/Card/HotelCard";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { animationsHotels } from "./animations";

const AllHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 4,
  });
  const [totalHotels, setTotalHotels] = useState(0);
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const hotelsRef = useRef(null);
  const navigate = useNavigate();

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await getAllHotels(filters);
        setHotels(data.hotels);
        setTotalHotels(data.totalHotels);
      } catch (err) {
        setError("Не вдалося отримати список готелів");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
    if (triggeredByPagination && hotelsRef.current) {
      hotelsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTriggeredByPagination(false);
    }
  }, [filters, triggeredByPagination]);

  const totalPages = Math.ceil(totalHotels / filters.limit);

  const handlePageChange = (page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
    setTriggeredByPagination(true);

    navigate({
      pathname: location.pathname,
      search: `?page=${page}`,
    });
  };

  let content;
  if (loading) {
    content = <SkeletonHotelsCardPage />;
  } else if (error) {
    content = <ErrorMessage />;
  } else {
    content = (
      <div className={styles["hotel-list"]}>
        {hotels.length === 0 ? (
          <div className={styles["no-hotels"]}>Готелі відсутні</div>
        ) : (
          hotels.map((hotel) => (
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={animationsHotels.card}
              viewport={{ once: true, amount: 0.5 }}
              key={hotel.id}
            >
              <HotelCard
                id={hotel.id}
                name={hotel.name}
                city={hotel.city}
                country={hotel.country}
                starRating={hotel.star_rating || 0}
                averageRating={
                  hotel.average_rating
                    ? Math.round(hotel.average_rating * 10) / 10
                    : 0
                }
                reviewCount={hotel.review_count || 0}
                isHotDeal={hotel.is_hot_deal}
                tourPrice={Number(hotel.tour_price)}
                season={hotel.season}
                amenities={hotel.amenity || []}
                hotelPhoto={`${imagesBaseUrl}${hotel.hotel_photos}`}
              />
            </motion.div>
          ))
        )}
      </div>
    );
  }

  return (
    <section ref={hotelsRef}>
      <h3 className={styles["title"]}>Ще готелі</h3>
      {content}
      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default AllHotels;
