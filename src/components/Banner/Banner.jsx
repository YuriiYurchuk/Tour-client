import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { animationsBanner } from "./animations";
import styles from "./Banner.module.scss";

const Banner = ({
  title,
  subtitle,
  mobileImage,
  tabletImage,
  desktopImage,
}) => {
  return (
    <motion.section
      className={styles.banner}
      initial="hidden"
      animate="visible"
      variants={animationsBanner.container}
    >
      <picture>
        <source media="(max-width: 500px)" srcSet={mobileImage} />
        <source
          media="(min-width: 501px) and (max-width: 1024px)"
          srcSet={tabletImage}
        />
        <source media="(min-width: 1025px)" srcSet={desktopImage} />
        <img src={desktopImage} alt="Banner" className={styles.image} />
      </picture>
      <div className={styles.overlay}>
        <header className={styles.content}>
          <motion.h1
            variants={animationsBanner.title}
            initial="hidden"
            animate="visible"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={animationsBanner.subtitle}
            initial="hidden"
            animate="visible"
          >
            {subtitle}
          </motion.p>
        </header>
      </div>
    </motion.section>
  );
};

Banner.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  mobileImage: PropTypes.string.isRequired,
  tabletImage: PropTypes.string.isRequired,
  desktopImage: PropTypes.string.isRequired,
};

export default Banner;
