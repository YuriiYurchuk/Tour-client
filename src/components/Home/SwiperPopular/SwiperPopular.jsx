import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./SwiperPopular.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-coverflow";
import { getTop } from "@api/getHotelApi";
import arrowLink from "../../../assets/images/arrow-link.svg";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { animationsHome } from "../animations";
import { motion } from "framer-motion";
import { SkeletonSwiperPopular } from "@components/Skeleton/SkeletonSwiperPopular";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import AnimatedOrders from "./AnimatedOrders";

const SwiperPopular = () => {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const loadTop = async () => {
      try {
        setLoading(true);
        const data = await getTop();
        setPopular(data.topHotels);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTop();
  }, []);

  let content;
  if (loading) {
    content = <SkeletonSwiperPopular />;
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
          modules={[Scrollbar, EffectCoverflow]}
          spaceBetween={100}
          effect="coverflow"
          scrollbar={{ hide: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={true}
          className={styles["swiper"]}
        >
          {popular.map((popularItem) => {
            const formattedName = popularItem.name
              .replace(/\s+/g, "-")
              .toLowerCase();
            return (
              <SwiperSlide
                key={popularItem.id}
                className={styles["swiper-slide"]}
              >
                <div className={styles["hotel-popular"]}>
                  <img
                    src={`${imagesBaseUrl}${popularItem.hotel_photos}`}
                    alt={popularItem.name}
                    className={styles["hotel-image"]}
                  />
                  <div>
                    <div className={styles["hotel-info"]}>
                      <p className={styles["hotel-order"]}>
                        <AnimatedOrders
                          totalOrders={popularItem.total_orders}
                        />{" "}
                        <FontAwesomeIcon
                          icon={faHeart}
                          className={styles["animated-heart"]}
                        />
                      </p>
                      <div>
                        <h4 className={styles["hotel-name"]}>
                          {popularItem.name}
                        </h4>
                        <Link
                          to={`/tour-selection/${popularItem.id}/${formattedName}`}
                          className={styles["details-link"]}
                        >
                          дізнатися докладніше{" "}
                          <img src={arrowLink} alt="ArrowLink" />
                        </Link>
                      </div>
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
    <div className={styles["background-container"]}>
      <section className="container">
        <header className={styles["header-popular"]}>
          <div className={styles["popular-text"]}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsHome.text}
            >
              Популярні готелі
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsHome.text}
            >
              затишок та розкіш у найкращих готелях світу
            </motion.p>
          </div>
          <motion.h3
            className={styles["popular-title"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={animationsHome.title}
          >
            Hotels
          </motion.h3>
        </header>
      </section>
      {content}
    </div>
  );
};

export default SwiperPopular;
