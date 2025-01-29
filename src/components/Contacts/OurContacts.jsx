import styles from "./Contacts.module.scss";
import { animationsOurContacts } from "./animations";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";

const OurContacts = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      variants={animationsOurContacts.container}
      viewport={{ once: true, amount: 0.5 }}
    >
      <ul className={styles["out-list"]}>
        <motion.li
          className={styles["social-networks"]}
          initial="hidden"
          whileInView="visible"
          variants={animationsOurContacts.item}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className={styles["our-title"]}>Ми в соц мережах</h3>
          <ul className={styles["social-list"]}>
            <li className={styles["social-item"]}>
              <a
                href="https://www.facebook.com"
                className={styles["social-link"]}
                target="_blank"
                rel="noopener noreferrer"
                title="facebook"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-square"></i>
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                title="twitter"
                aria-label="Twitter"
              >
                <i className="fab fa-x-twitter "></i>
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="instagram"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                title="linkedin"
                aria-label="Linkedin"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li className={styles["social-item"]}>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noopener noreferrer"
                title="telegram"
                aria-label="Telegram"
              >
                <i className="fab fa-telegram-plane"></i>
              </a>
            </li>
          </ul>
        </motion.li>
        <motion.li
          className={styles["contacts"]}
          initial="hidden"
          whileInView="visible"
          variants={animationsOurContacts.item}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className={styles["our-title"]}>Наші контакти</h3>
          <ul className={styles["contacts-list"]}>
            <li className={styles["contact-item"]}>
              <a href="tel:+380123456789" className={styles["contact-link"]}>
                +38 (012) 345-67-89
              </a>
            </li>
            <li className={styles["contact-item"]}>
              <a href="tel:+380987654321" className={styles["contact-link"]}>
                +38 (098) 765-43-21
              </a>
            </li>
            <li className={styles["contact-item"]}>
              <a
                href="mailto:example@email.com"
                className={styles["contact-link__email"]}
              >
                example@email.com
              </a>
            </li>
          </ul>
        </motion.li>
        <motion.li
          className={styles["address"]}
          initial="hidden"
          whileInView="visible"
          variants={animationsOurContacts.item}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h3 className={styles["our-title"]}>Адреса</h3>
          <ul className={styles["address-list"]}>
            <li className={styles["address-item"]}>
              <a
                href="https://www.google.com/maps?q=Київ,+Хрещатик+22"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["address-link"]}
                aria-label="Адреса на Google Maps"
              >
                <span className={styles["address-icon"]}>
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <span className={styles["address-text"]}>
                  Київ, Хрещатик будинок 22, (2поверх)
                </span>
              </a>
            </li>
          </ul>
        </motion.li>
      </ul>
    </motion.section>
  );
};

export default OurContacts;
