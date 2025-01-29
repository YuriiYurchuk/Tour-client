import styles from "./AboutHome.module.scss";
import AboutUsComponents from "@components/AboutUs/AboutUsComponents";
import { motion } from "framer-motion";
import { animationsHome } from "./animations";

const AboutHome = () => {
  return (
    <section className={styles["section-about"]}>
      <header className={`${styles["header-about"]} container`}>
        <div className={styles["about-text"]}>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsHome.text}
          >
            Про нас
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsHome.text}
          >
            Надихаємо світ на подорожі
          </motion.p>
        </div>
        <motion.h3
          className={styles["about-title"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={animationsHome.title}
        >
          We
        </motion.h3>
      </header>
      <AboutUsComponents />
    </section>
  );
};

export default AboutHome;
