import { motion } from "framer-motion";
import { animationsAboutUs } from "./animations";
import imgTop from "../../assets/images/about-top.webp";
import imgBottom from "../../assets/images/about-bottom.webp";
import styles from "./AboutUs.module.scss";

const AboutUsComponents = () => {
  return (
    <section className="container">
      <article className={styles["article-top"]}>
        <motion.section
          className={styles["section-top__title"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsAboutUs.articleTop}
        >
          <motion.div
            className={styles["article-top__text"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsAboutUs.textTop}
          >
            <p>
              <span className={styles["highlight"]}>МИ</span> - команда
              професіоналів, закоханих у мистецтво подорожей. Наша історія
              почалася з мрії про те, щоб зробити кожну подорож незабутньою,
              кожну пригоду унікальною.
            </p>
            <p>
              Наша місія — зробити подорожі доступними та незабутніми. Ми
              пропонуємо вам не просто тури, а чарівні історії, які житимуть у
              вашому серці назавжди. Незалежно від того, чи шукаєте ви релакс на
              пляжі, культурні вишукування або екстремальні пригоди, ми створимо
              вам оптимальну подорож, підлаштовану під ваші унікальні бажання.
            </p>
          </motion.div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={animationsAboutUs.imageTop}
        >
          <img className={styles["about-img"]} src={imgTop} alt="" />
        </motion.section>
      </article>
      <article className={styles["article-bottom"]}>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={animationsAboutUs.imageBottom}
        >
          <img
            className={`${styles["about-img"]} ${styles["img-bottom"]}`}
            src={imgBottom}
            alt=""
          />
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={animationsAboutUs.articleBottom}
        >
          <motion.div
            className={styles["article-bottom__text"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={animationsAboutUs.textBottom}
          >
            <p>
              Ми пишаємося нашою командою досвідчених фахівців, кожен з яких
              поділяє пристрасть до туризму та прагнення зробити вашу подорож
              незабутньою. Ми уважно стежимо за останніми тенденціями в
              індустрії, щоб запропонувати вам лише найкращі та найактуальніші
              варіанти.
            </p>
            <p>
              Приєднуйтесь до нас у цій захопливій подорожі! Ми готові
              подарувати вам моменти радості, натхнення та здивування у кожному
              куточку нашого дивовижного світу.
            </p>
          </motion.div>
        </motion.section>
      </article>
    </section>
  );
};

export default AboutUsComponents;
