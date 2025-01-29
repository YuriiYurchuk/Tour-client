import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import styles from "./ToggleNavigation.module.scss";
import { Each } from "@components/Each";
import Button from "@components/UI/Button/Button";
import UserMenu from "./UserMenu";
import iconPhone from "../../assets/images/phone-icon.svg";
import iconLocation from "../../assets/images/location-icon.svg";
import ModalPhone from "@components/Modal/ModalHeder/ModalPhone";
import ModalLocation from "@components/Modal/ModalHeder/ModalLocation";
import { motion } from "framer-motion";
import closeIcon from "../../assets/images/close-icon.svg";

const NavLinkItem = ({ to, children, style }) => (
  <NavLink
    to={to}
    style={style}
    className={({ isActive }) =>
      isActive
        ? `${styles["menu-category-link"]} ${styles["active"]}`
        : styles["menu-category-link"]
    }
  >
    {children}
  </NavLink>
);

NavLinkItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

const MenuCategory = ({ title, items }) => (
  <li>
    <h3 className={styles["menu-category-title"]}>{title}</h3>
    <ul className={styles["menu-category-list"]}>
      <Each
        of={items}
        render={({ to, label, style }, index) => (
          <li key={index}>
            <NavLinkItem to={to} style={style}>
              {label}
            </NavLinkItem>
          </li>
        )}
      />
    </ul>
  </li>
);

MenuCategory.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      style: PropTypes.object,
    })
  ).isRequired,
};

const ToggleNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const authState = useSelector((state) => state.auth);

  const handleLoginClick = () => {
    navigate("/auth");
  };

  const toggleNavigation = () => {
    setIsNavOpen((prevState) => {
      const newState = !prevState;
      if (window.innerWidth <= 600) {
        if (newState) {
          document.body.classList.add("menu-open");
        } else {
          document.body.classList.remove("menu-open");
        }
      } else {
        document.body.classList.remove("menu-open");
      }
      return newState;
    });
  };

  useEffect(() => {
    setIsNavOpen(false);
    document.body.classList.remove("menu-open");
  }, [location]);

  return (
    <div>
      <motion.button
        aria-expanded={isNavOpen}
        aria-controls="navigation-menu"
        className={`${styles["toggle"]} ${isNavOpen ? styles["open"] : ""}`}
        onClick={toggleNavigation}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 1,
          duration: 1,
          ease: "easeInOut",
        }}
      >
        <span className={styles["toggle-icon"]}></span>
      </motion.button>
      <div
        id="navigation-menu"
        className={`${styles["toggle-menu"]} ${
          isNavOpen ? styles["open"] : ""
        }`}
        role="menu"
      >
        <div className={styles["btn-container"]}>
          <button className={styles["mobil-button"]} onClick={toggleNavigation}>
            <img src={closeIcon} alt="" />
          </button>
        </div>
        <nav className={styles["toggle-menu__nav"]}>
          <ul className={styles["toggle-menu__list"]}>
            <MenuCategory
              title="Популярні країни"
              items={[
                { to: "/*", label: "Туреччина" },
                { to: "/*", label: "Єгипет" },
                { to: "/*", label: "Мальдіви" },
                { to: "/*", label: "ОАЕ" },
                { to: "/*", label: "Куба" },
                { to: "/*", label: "Шрі-Ланка" },
              ]}
            />
            <MenuCategory
              title="Туристам"
              items={[
                { to: "/countries", label: "Країни" },
                { to: "/hotels", label: "Готелі" },
                { to: "/tour-selection", label: "Підбір туру" },
                {
                  to: "/hot-tours",
                  label: "Гарячі тури",
                  style: { color: "#ec1c24", fontWeight: 500 },
                },
                { to: "/tour-payment", label: "Як купити і оплатити тур" },
              ]}
            />
            <MenuCategory
              title="Компанія"
              items={[
                { to: "/about-us", label: "Про нас" },
                { to: "/reviews", label: "Відгуки" },
                { to: "/contacts", label: "Контакти" },
              ]}
            />
          </ul>
        </nav>
        <div
          className={`${styles["header-buttons__toggle"]} flex items-center gap-5`}
        >
          <div className={styles["header-icon"]}>
            <button
              onClick={() => setIsPhoneOpen(true)}
              className={styles["heder-btn__phone"]}
            >
              <img src={iconPhone} alt="Іконка телефону" />
            </button>
            <button
              onClick={() => setIsLocationOpen(true)}
              className={styles["heder-btn__location"]}
            >
              <img src={iconLocation} alt="Іконка локації" />
            </button>
          </div>
          {authState.user ? (
            <UserMenu
              username={authState.user.username}
              avatar_url={authState.user.avatar_url}
            />
          ) : (
            <Button onClick={handleLoginClick}>Авторизуватись</Button>
          )}
        </div>
      </div>
      <ModalPhone
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
      ></ModalPhone>
      <ModalLocation
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        coordinates={[50.45000033853365, 30.523172265526192]}
      ></ModalLocation>
    </div>
  );
};

export default ToggleNavigation;
