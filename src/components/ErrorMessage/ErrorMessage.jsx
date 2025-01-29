import { motion } from "framer-motion";
import styles from "./ErrorMessage.module.scss";
import error from "../../assets/images/error.webp";

const animationVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ErrorMessage = () => {
  return (
    <motion.section
      className={styles["error-container"]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={animationVariants}
    >
      <motion.header
        className={styles["error-content"]}
        variants={animationVariants}
      >
        <motion.h2
          className={styles["error-title"]}
          variants={animationVariants}
        >
          Контент тимчасово недоступний
        </motion.h2>
        <motion.p className={styles["error-text"]} variants={animationVariants}>
          Ми працюємо над усуненням проблем. Будь ласка, спробуйте знову трохи
          пізніше. Дякуємо за ваше терпіння та розуміння!
        </motion.p>
      </motion.header>
      <motion.footer
        className={styles["error-footer"]}
        variants={animationVariants}
      >
        <motion.img
          src={error}
          alt="Ілюстрація помилки"
          className={styles["error-image"]}
          variants={animationVariants}
        />
        <motion.address variants={animationVariants}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Якщо проблема повторюється, зв'яжіться з нами за{" "}
          <a href="mailto:support@example.com">support@example.com</a>
        </motion.address>
      </motion.footer>
    </motion.section>
  );
};

export default ErrorMessage;
