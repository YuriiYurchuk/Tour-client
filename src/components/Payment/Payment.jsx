import { motion } from "framer-motion";
import styles from "./Payment.module.scss";
import cardVisa from "../../assets/images/card-visa.jpg";
import cardMc from "../../assets/images/card-mc.jpg";

const Payment = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <section className={styles["container-payment"]}>
      <motion.h3 className={styles["payment"]} {...fadeInUp}>
        Порядок оплати карткою
      </motion.h3>
      <motion.h4 className={styles["title"]} {...fadeInUp}>
        ОПЛАТА З ДОПОМОГЮ БАНКІВСЬКОЇ КАРТИ
      </motion.h4>
      <motion.p className={styles["text"]} {...fadeInUp}>
        Для вибору оплати товару за допомогою банківської картки на відповідній
        сторінці сайту необхідно натиснути кнопку «Оплата банківською карткою».
        Оплата відбувається через авторизаційний сервер Процесингового центру
        Банку з використанням Банківських кредитних карток наступних платіжних
        систем: VISA International, MasterCard World Wide
      </motion.p>
      <motion.h4 className={styles["title-payment"]} {...fadeInUp}>
        Опис процесу оплати
      </motion.h4>
      <motion.p className={styles["text"]} {...fadeInUp}>
        При виборі форми оплати за допомогою пластикової картки проведення
        платежу на замовлення здійснюється безпосередньо після його оформлення.
        Після завершення оформлення замовлення в нашому магазині, Ви повинні
        натиснути на кнопку «Оплата банківською картою», при цьому система
        переключить Вас на сторінку авторизаційного сервера, де Вам буде
        запропоновано ввести дані пластикової картки, ініціювати її авторизацію,
        після чого повернутися в наш магазин кнопкою "Повернутись до магазину".
        Після того, як Ви повертаєтеся до нашого магазину, система повідомить
        Вас про результати авторизації. У разі підтвердження авторизації Ваше
        замовлення автоматично виконуватиметься відповідно до заданих Вами
        умов.У разі відмови в авторизації картки Ви зможете повторити процедуру
        оплати.
      </motion.p>
      <motion.h4 className={styles["title-payment"]} {...fadeInUp}>
        При анулюванні замовлення
      </motion.h4>
      <motion.p className={styles["text"]} {...fadeInUp}>
        При анулюванні позицій із оплаченого замовлення (або при анулюванні
        замовлення повністю) за Вашою ініціативою з Вас можуть бути утримані
        фактично понесені витрати компанії.
      </motion.p>
      <motion.h4 className={styles["title-payment"]} {...fadeInUp}>
        Доставка
      </motion.h4>
      <motion.p className={styles["text"]} {...fadeInUp}>
        Документи, необхідні для поїздки: ваучер, авіаквитки, страховки будуть
        відправлені на Вашу електронну пошту не пізніше, ніж за добу до вильоту.
      </motion.p>
      <motion.div className={styles["warning"]} {...fadeInUp}>
        <p className={styles["exclamation"]}>!</p>
        <p className={styles["warning-text"]}>
          Оплата банківськими картками здійснюється після перевірки замовлення
          менеджером інтернет-магазину.
        </p>
      </motion.div>
      <motion.div className={styles["card-block"]} {...fadeInUp}>
        <div>
          <h5 className={styles["card-title"]}>
            Оплата за банківськими картками VISA
          </h5>
          <p className={styles["card-text"]}>
            До оплати приймаються всі види платіжних карток VISA, крім Visa
            Electron. У більшості випадків картка Visa Electron не
            застосовується для оплати через інтернет, за винятком карток,
            випущених окремими банками. Про можливість оплати карткою Visa
            Electron вам потрібно дізнатися у банку-емітента вашої картки.
          </p>
          <img src={cardVisa} alt="Visa" />
        </div>
        <div>
          <h5 className={styles["card-title"]}>
            Оплата за кредитними картками MasterCard
          </h5>
          <p className={styles["card-text"]}>
            На сайті приймаються всі види MasterCard.
          </p>
          <img src={cardMc} alt="MasterCard" />
        </div>
      </motion.div>
    </section>
  );
};

export default Payment;
