import { useState } from "react";
import { motion } from "framer-motion";
import Radio from "@components/UI/RadioButton/Radio";
import styles from "./DataFilling.module.scss";

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <section className="container">
      <section className={styles["payment-details"]}>
        <motion.h3
          className={styles["payment"]}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Спосіб оплати
        </motion.h3>
        <motion.div
          className="flex flex-col gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Radio
            name="payment"
            value="card"
            label="Онлайн платіж на сайті"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          <Radio
            name="payment"
            value="cash"
            label="Оплата особисто (в офісі)"
            checked={paymentMethod === "cash"}
            onChange={() => setPaymentMethod("cash")}
          />
        </motion.div>
        {paymentMethod === "card" ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={styles["card"]}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className={styles["card-front"]}>
                <p className={styles["label"]}>Номер картки:</p>
                <input
                  className={styles["card-number"]}
                  type="text"
                  placeholder="XXXX XXXX XXXX XXXX"
                />
                <div className={styles["expiry-container"]}>
                  <p className={styles["label"]}>Діє до:</p>
                  <div className="flex gap-2">
                    <input
                      className={styles["card-expiry"]}
                      type="text"
                      placeholder="MM"
                    />
                    <span>/</span>
                    <input
                      className={styles["card-expiry"]}
                      type="text"
                      placeholder="YY"
                    />
                  </div>
                </div>
                <p className={styles["label"]}>Ім’я власника картки:</p>
                <input
                  className={styles["card-holder"]}
                  type="text"
                  placeholder="Ім’я Прізвище"
                />
              </div>
              <div className={styles["card-back"]}>
                <div className="relative">
                  <div className={styles["black-strip"]}></div>
                </div>
                <div className={styles["cvc-field"]}>
                  <p className={styles["label"]}>CVC2/CVV2</p>
                  <input
                    className={styles["card-cvc"]}
                    type="text"
                    placeholder="XXX"
                  />
                </div>
              </div>
            </motion.div>
            <motion.button
              className={styles["submit-button"]}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Оплатити
            </motion.button>
          </motion.section>
        ) : (
          <motion.section
            className="bg-gray-100 p-4 rounded-md border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-2">Оплата готівкою</h3>
            <p>Ви зможете оплатити замовлення готівкою при отриманні.</p>
          </motion.section>
        )}
      </section>
    </section>
  );
};

export default PaymentDetails;
