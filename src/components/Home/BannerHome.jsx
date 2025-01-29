import { motion } from "framer-motion";
import styles from "./BannerHome.module.scss";
import imgDesktop from "../../assets/images/Home/banner-home-desktop.webp";
import imgTablet from "../../assets/images/Home/banner-home-tablet.webp";
import imgMobile from "../../assets/images/Home/banner-home-mobile.webp";
import arrow from "../../assets/images/arrow-home.svg";

const BannerHome = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const arrowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5 } },
    bounce: {
      y: [0, 10, 0],
      transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
    },
  };

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className={styles["banner-home"]}>
      <picture>
        <source media="(max-width: 500px)" srcSet={imgMobile} />
        <source
          media="(min-width: 501px) and (max-width: 1024px)"
          srcSet={imgTablet}
        />
        <source media="(min-width: 1025px)" srcSet={imgDesktop} />
        <img
          src={imgDesktop}
          alt="Banner"
          className={styles["banner-images"]}
        />
      </picture>
      <motion.header
        className={styles["banner-home__content"]}
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.h1 variants={textVariants}>Подорожі мрії</motion.h1>
        <motion.p variants={textVariants}>Вибери свою</motion.p>
        <motion.button
          initial="hidden"
          animate={["visible", "bounce"]}
          variants={arrowVariants}
          onClick={scrollToNextSection}
        >
          <img src={arrow} alt="Arrow" />
        </motion.button>
      </motion.header>
    </section>
  );
};

export default BannerHome;
