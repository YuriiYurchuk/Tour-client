import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Footer.module.scss";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/footer-logo.svg";
import envelope from "../../assets/images/envelope-icon.svg";
import arrow from "../../assets/images/arrow-icon.svg";
import { handleEmail } from "../../services/emailSubscriberService";
import { motion } from "framer-motion";
import { animationsFooter } from "./animations";
import "@fortawesome/fontawesome-free/css/all.min.css";

const NAV_ITEMS = [
  { to: "/tour-selection", label: "Підбір туру" },
  { to: "/hot-tours", label: "Гарячі тури" },
  { to: "/hotels", label: "Готелі" },
  { to: "/countries", label: "Країни" },
  { to: "/tour-payment", label: "Оплата" },
  { to: "/reviews", label: "Відгуки" },
  { to: "/about-us", label: "Про нас" },
  { to: "/contacts", label: "Контакти" },
];

const SOCIAL_ITEMS = [
  {
    href: "https://www.facebook.com",
    iconClass: "fab fa-facebook-square",
    title: "facebook",
  },
  {
    href: "https://twitter.com",
    iconClass: "fab fa-x-twitter",
    title: "twitter",
  },
  {
    href: "https://www.instagram.com",
    iconClass: "fab fa-instagram",
    title: "instagram",
  },
  {
    href: "https://www.linkedin.com",
    iconClass: "fab fa-linkedin",
    title: "linkedin",
  },
  {
    href: "https://telegram.org",
    iconClass: "fab fa-telegram-plane",
    title: "telegram",
  },
];

const Footer = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    handleEmail(data);
  };

  const handleError = (error) => {
    if (error?.email) {
      setErrorMessage(error.email.message);
      setIsError(true);
      setTimeout(() => {
        setErrorMessage("");
        setIsError(false);
      }, 2000);
    }
  };

  return (
    <motion.footer className={styles["footer"]}>
      <div className="container">
        <motion.div
          className={styles["footer-text-form"]}
          variants={animationsFooter.stagger}
          viewport={{ once: true, amount: 0.5 }}
          initial="hidden"
          whileInView="visible"
        >
          <motion.div variants={animationsFooter.slideUp}>
            <NavLink to="/" className={styles.logo}>
              <img src={logo} alt="Anex Logo" />
            </NavLink>
          </motion.div>
          <motion.div
            className={styles["footer-form"]}
            variants={animationsFooter.slideUp}
          >
            <p className={styles["footer-text"]}>
              Дізнавайтесь про гарячі тури першими
            </p>
            <form
              onSubmit={handleSubmit(onSubmit, handleError)}
              className={styles["input-wrapper"]}
            >
              <span
                className={`${styles["input-icon"]} ${
                  isError ? styles["input-icon-error"] : ""
                }`}
              >
                <img src={envelope} alt="envelope icon" />
              </span>
              <input
                type="email"
                placeholder={errorMessage || "Введіть пошту"}
                className={`${styles["email-input"]} ${
                  isError ? styles["input-error"] : ""
                }`}
                {...register("email", {
                  required: "Поле обов'язкове",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Невірний формат пошти",
                  },
                })}
              />
              <button type="submit" className={styles["submit-btn"]}>
                <img src={arrow} alt="arrow icon" />
              </button>
            </form>
          </motion.div>
        </motion.div>
        <motion.nav
          className={styles["footer-nav"]}
          variants={animationsFooter.slideUp}
          viewport={{ once: true, amount: 0.5 }}
          initial="hidden"
          whileInView="visible"
        >
          <ul className={styles["footer-list"]}>
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? `${styles["footer-list__link"]} ${styles["active"]}`
                      : styles["footer-list__link"]
                  }
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </motion.nav>
        <motion.nav
          className={styles["footer-social__nav"]}
          variants={animationsFooter.slideUp}
          viewport={{ once: true, amount: 0.5 }}
          initial="hidden"
          whileInView="visible"
        >
          <ul className={styles["footer-social__list"]}>
            {SOCIAL_ITEMS.map(({ href, iconClass, title }) => (
              <motion.li
                key={href}
                className="text-white text-3xl transition-transform hover:scale-125"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                >
                  <i className={iconClass}></i>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.nav>
        <div className={styles["copyright"]}>
          2025 © Anex Tour. Всі права захищені.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
