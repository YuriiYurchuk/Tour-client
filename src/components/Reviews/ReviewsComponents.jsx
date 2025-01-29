import styles from "./ReviewsComponents.module.scss";
import { MButton } from "@components/UI/Button/Button";
import { motion } from "framer-motion";

const ReviewsComponents = () => {
  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section>
      <header className={styles["reviews-header"]}>
        <motion.h2
          className={styles["reviews-title"]}
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Відгуки
        </motion.h2>
        <MButton
          variants={animationVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Залишити відгук
        </MButton>
      </header>
    </section>
  );
};

export default ReviewsComponents;
