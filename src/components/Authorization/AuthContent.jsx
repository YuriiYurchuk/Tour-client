import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../assets/images/header-logo.svg";
import styles from "./AuthContent.module.scss";
import { animationsAuthContent } from "./animations";

const AuthContent = () => {
  return (
    <motion.aside
      className={`pl-10 ${styles["aside-auth"]}`}
      {...animationsAuthContent.aside}
    >
      <motion.header className="mb-40" {...animationsAuthContent.header}>
        <Link to="/">
          <motion.img
            src={logo}
            alt="Логотип"
            {...animationsAuthContent.logo}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
        </Link>
      </motion.header>
      <motion.div {...animationsAuthContent.content}>
        <h2 className={`normal-case text-6xl mb-5 ${styles["auth-title"]}`}>
          Ласкаво просимо!
        </h2>
        <p className="text-xl text-white max-w-md mb-5">
          Ми — туристична компанія, яка допоможе вам знайти найкращі маршрути
          для подорожей та відпочинку!
        </p>
      </motion.div>
      <motion.nav {...animationsAuthContent.nav}>
        <ul className="flex gap-5">
          <li className="text-white text-3xl transition-transform hover:scale-125">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="facebook"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
          </li>
          <li className="text-white text-3xl transition-transform hover:scale-125">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              title="twitter"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
          </li>
          <li className="text-white text-3xl transition-transform hover:scale-125">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li className="text-white text-3xl transition-transform hover:scale-125">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="linkedin"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li className="text-white text-3xl transition-transform hover:scale-125">
            <a
              href="https://telegram.org"
              target="_blank"
              rel="noopener noreferrer"
              title="telegram"
            >
              <i className="fab fa-telegram-plane"></i>
            </a>
          </li>
        </ul>
      </motion.nav>
    </motion.aside>
  );
};

export default AuthContent;
