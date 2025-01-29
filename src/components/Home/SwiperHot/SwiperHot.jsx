import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SwiperHot.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import { motion } from "framer-motion";
import { animationsHome } from "../animations.js";
import { getTopHotDeals } from "@api/getHotelApi";
import { formatDate } from "@utils/formatDate";
import arrowLink from "../../../assets/images/arrow-link.svg";
import { SkeletonSwiperHot } from "@components/Skeleton/SkeletonSwiperHot";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";

const SwiperHot = () => {
  const [hotDeals, setHotDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const loadHotDeals = async () => {
      try {
        setLoading(true);
        const data = await getTopHotDeals();
        setHotDeals(data.topHotDeals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHotDeals();
  }, []);

  let content;
  if (loading) {
    content = <SkeletonSwiperHot />;
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
          {hotDeals.map((deal, index) => {
            const formattedName = deal.name.replace(/\s+/g, "-").toLowerCase();
            return (
              <SwiperSlide
                key={deal.id || index}
                className={styles["swiper-slide"]}
              >
                <div className={styles["hotel-deal"]}>
                  <img
                    src={`${imagesBaseUrl}${deal.hotel_photos}`}
                    alt={deal.name}
                    className={styles["hotel-image"]}
                  />
                  <div className={styles["hotel-info"]}>
                    <p className={styles["hotel-price"]}>
                      від {deal.tour_price} ₴
                    </p>
                    <div>
                      <div className={styles["hotel-location"]}>
                        <h4>{deal.country}</h4>
                        <span className={styles["circle"]}></span>
                        <h4>{deal.city}</h4>
                      </div>
                      <h4 className={styles["hotel-date"]}>
                        Закінчення{" "}
                        <time dateTime={deal.tour_end_date}>
                          {formatDate(deal.tour_end_date)}
                        </time>
                      </h4>
                      <Link
                        to={`/tour-selection/${deal.id}/${formattedName}`}
                        className={styles["details-link"]}
                      >
                        дізнатися докладніше{" "}
                        <img src={arrowLink} alt="ArrowLink" />
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    );
  }

  return (
    <section className="container">
      <header className={styles["header-hot"]}>
        <div className={styles["hot-text"]}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsHome.text}
          >
            Гарячі тури
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsHome.text}
          >
            Спіймайте момент
          </motion.p>
        </div>
        <motion.h3
          className={styles["tours-title"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={animationsHome.title}
        >
          Tours
        </motion.h3>
      </header>
      {content}
    </section>
  );
};

export default SwiperHot;
