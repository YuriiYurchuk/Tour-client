import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/header-logo.svg";
import { MButton } from "../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  restoreUserFromToken,
  refreshUserToken,
} from "../../redux/slices/authSlice";
import { jwtDecode } from "jwt-decode";
import iconPhone from "../../assets/images/phone-icon.svg";
import iconLocation from "../../assets/images/location-icon.svg";
import UserMenu from "./UserMenu";
import ToggleNavigation from "./ToggleNavigation";
import styles from "./Header.module.scss";
import ModalPhone from "@components/Modal/ModalHeder/ModalPhone";
import ModalLocation from "@components/Modal/ModalHeder/ModalLocation";
import { motion } from "framer-motion";
import { animationsHeader } from "./animations";

const NAV_ITEMS = [
  { to: "/tour-selection", label: "Підбір туру" },
  {
    to: "/hot-tours",
    label: "Гарячі тури",
    style: { color: "#ec1c24", fontWeight: 500 },
  },
  { to: "/countries", label: "Країни" },
  { to: "/hotels", label: "Готелі" },
];

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    dispatch(restoreUserFromToken());

    if (!accessToken) {
      dispatch(refreshUserToken());
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (authState.accessToken) {
      const tokenData = jwtDecode(authState.accessToken);
      const timeRemaining = tokenData.exp - Date.now() / 1000;

      const timer = setTimeout(() => {
        dispatch(refreshUserToken());
      }, Math.max(timeRemaining - 300, 0) * 1000);

      return () => clearTimeout(timer);
    }
  }, [authState.accessToken, dispatch]);

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <motion.div
      className={styles["container-shadow"]}
      {...animationsHeader.header}
    >
      <header className="container">
        <div className={styles["header-wrapper"]}>
          <div className={styles["logo-wrapper"]}>
            <NavLink className={styles["logo"]} to="/">
              <motion.img {...animationsHeader.logo} src={logo} alt="Логотип" />
            </NavLink>
          </div>
          <nav className={styles["header-nav"]}>
            <ul className={styles["header-nav__menu"]}>
              {NAV_ITEMS.map((item, index) => (
                <motion.li key={item.to} {...animationsHeader.navLink(index)}>
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `${styles["nav-link"]} ${styles["active"]}`
                        : styles["nav-link"]
                    }
                    to={item.to}
                    style={item.style || {}}
                  >
                    {item.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div
            className={`${styles["header-buttons"]} flex items-center gap-5`}
          >
            <div className={styles["header-icon"]}>
              <motion.button
                onClick={() => setIsPhoneOpen(true)}
                className={styles["heder-btn__phone"]}
                {...animationsHeader.button(0)}
              >
                <img src={iconPhone} alt="Іконка телефону" />
              </motion.button>
              <motion.button
                onClick={() => setIsLocationOpen(true)}
                className={styles["heder-btn__location"]}
                {...animationsHeader.button(1)}
              >
                <img src={iconLocation} alt="Іконка локації" />
              </motion.button>
            </div>
            {authState.user ? (
              <UserMenu
                username={authState.user.username}
                avatar_url={authState.user.avatar_url}
              />
            ) : (
              <MButton
                onClick={handleLoginClick}
                {...animationsHeader.buttonAuth}
              >
                Авторизуватись
              </MButton>
            )}
          </div>
          <ToggleNavigation />
        </div>
      </header>
      <ModalPhone
        isOpen={isPhoneOpen}
        onClose={() => setIsPhoneOpen(false)}
      ></ModalPhone>
      <ModalLocation
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
        coordinates={[50.45000033853365, 30.523172265526192]}
      ></ModalLocation>
    </motion.div>
  );
};

export default Header;
