import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import styles from "./Gallery.module.scss";
import PropTypes from "prop-types";
import "./index.scss";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";

const Gallery = ({ hotelGallery }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={animationsDetails.appearanceTop}
    >
      <Swiper
        initialSlide={0}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={styles["gallery-swiper"]}
      >
        {hotelGallery.map((image) => (
          <SwiperSlide key={image.id} className={styles["gallery-slide"]}>
            <img
              src={`${imagesBaseUrl}${image.photo_url}`}
              alt={image.description || `Фото ${image.id}`}
              className={styles["image"]}
            />
          </SwiperSlide>
        ))}
        <div className={styles["autoplay-progress"]} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </motion.div>
  );
};

Gallery.propTypes = {
  hotelGallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      photo_url: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default Gallery;
