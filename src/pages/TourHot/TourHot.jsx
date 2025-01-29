import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import styles from "./TourHot.module.scss";
import imgDesktop from "../../assets/images/TourHot/banner-tour-hot-desktop.webp";
import imgTablet from "../../assets/images/TourHot/banner-tour-hot-tablet.webp";
import imgMobile from "../../assets/images/TourHot/banner-tour-hot-mobile.webp";
import { getAllHotelsHot } from "@api/getHotelApi";
import HotelCard from "@components/Card/HotelCard";
import Pagination from "@components/Pagination/Pagination";
import { motion } from "framer-motion";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { SkeletonHotelsCard } from "@components/Skeleton/SkeletonHotelsCard";
import Sorting from "@components/Sorting/Sorting";
import { MButton } from "@components/UI/Button/Button";
import mapIcon from "../../assets/images/map-icon.svg";
import filterIcon from "../../assets/images/filter-icon.svg";
import ModalFilter from "@components/Modal/ModalFilter";
import ContactForm from "@components/ContactForm/ContactForm";

const TourHot = () => {
  const [hotels, setHotels] = useState([]);
  const [totalHotels, setTotalHotels] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 8,
  });
  const [triggeredByPagination, setTriggeredByPagination] = useState(false);
  const [isModalFilter, setIsModalFilter] = useState(false);
  const hotelsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const pageFromUrl = urlParams.get("page");
    if (pageFromUrl) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: parseInt(pageFromUrl, 10),
      }));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const data = await getAllHotelsHot(filters);
        setHotels(data.hotDeals);
        setTotalHotels(data.totalHotDeals);
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

  console.log(hotels);

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

  const getCorrectWord = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "пропозиція";
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return "пропозиції";
    } else {
      return "пропозицій";
    }
  };

  let content;
  if (loading) {
    content = <SkeletonHotelsCard />;
  } else if (error) {
    content = <ErrorMessage />;
  } else {
    content = (
      <div className={styles["hotel-list"]}>
        {hotels.map((hotel) => (
          <motion.div
            key={hotel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              opacity: { duration: 1, ease: "easeOut" },
              y: { duration: 1, ease: "easeOut" },
            }}
            viewport={{ once: true, amount: 0.5 }}
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
              tourStartDate={hotel.tour_start_date}
              tourEndDate={hotel.tour_end_date}
              includedMealTypes={hotel.included_meal_types}
              season={hotel.season}
              amenities={hotel.amenity || []}
              hotelPhoto={`${imagesBaseUrl}${hotel.hotel_photos}`}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <section className={styles["tour-hot"]}>
      <Banner
        title="Гарячі тури"
        subtitle="Спеціальні пропозиції для тих, хто шукає вигідні пригоди"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <section ref={hotelsRef} className="container">
        <div className={styles["results-header"]}>
          <h2 className={styles["results-title"]}>
            Найдені варіанти{" "}
            <span className={styles["results-count"]}>
              ({totalHotels} {getCorrectWord(totalHotels)})
            </span>
          </h2>
        </div>
        <div className={styles["controls-wrapper"]}>
          <Sorting filters={filters} setFilters={setFilters} />
          <div className={styles["map-filter"]}>
            <Link to="/maps" className={styles["btn-map"]}>
              <img src={mapIcon} alt="map-icon" /> Карта
            </Link>
            <MButton
              onClick={() => setIsModalFilter(true)}
              className={styles["btn-filter"]}
            >
              <img src={filterIcon} alt="filter-icon" /> Фільтри
              {Object.keys(filters).filter(
                (key) => filters[key] && key !== "page" && key !== "limit" // Ігноруємо системні параметри
              ).length > 0 && (
                <span className={styles["filter-badge"]}>
                  {
                    Object.keys(filters).filter(
                      (key) => filters[key] && key !== "page" && key !== "limit"
                    ).length
                  }
                </span>
              )}
            </MButton>
          </div>
        </div>
        {content}
        <Pagination
          currentPage={filters.page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
      <section className={styles["contact-form-wrapper"]}>
        <ContactForm
          title="Не визначились із вибором?"
          text="Залишіть свій номер і наш фахівець допоможе вам із підбором туру"
        />
      </section>
      <ModalFilter
        isOpen={isModalFilter}
        onClose={() => setIsModalFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </section>
  );
};

export default TourHot;
