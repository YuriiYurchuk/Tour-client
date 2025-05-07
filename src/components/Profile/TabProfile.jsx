import { useState, useEffect } from "react";
import {
  getDataUser,
  resendVerificationEmail,
  softDeleteUser,
  restoreUser,
} from "@api/userApi";
import PropTypes from "prop-types";
import { formatMonthDayYear } from "@utils/formatDate";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { subscribeUser, unsubscribeUser } from "@api/emailSubscriberApi";
import styles from "./Profile.module.scss";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { animationsProfile } from "./animations";

const TabProfile = ({ onUsernameLoad }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [sendingVerification, setSendingVerification] = useState(false);
  const dispatch = useDispatch();

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getDataUser();
        setUser(data.user);
        onUsernameLoad(data.user.username);
        setSubscribed(data.user.is_subscribed);
      } catch (error) {
        console.error("Помилка отримання профілю:", error);
        toast.error("Не вдалося отримати дані профілю.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [onUsernameLoad]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSubscribe = async () => {
    try {
      await subscribeUser(user.id);
      setSubscribed(true);
      toast.success("Ви підписалися на розсилку гарячих турів!");
    } catch (error) {
      console.error("Не вдалося підписати користувача:", error.message);
      toast.error("Помилка підписки.");
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeUser(user.id);
      setSubscribed(false);
      toast.success("Ви відписалися від розсилки гарячих турів.");
    } catch (error) {
      console.error("Не вдалося відписати користувача:", error.message);
      toast.error("Помилка відписки.");
    }
  };

  const handleResendVerification = async () => {
    if (!user) return;
    setSendingVerification(true);
    try {
      await resendVerificationEmail(user.email);
      toast.success("Лист для підтвердження надіслано!");
    } catch (error) {
      console.error(
        "Помилка відправки листа для підтвердження:",
        error.message
      );
      toast.error("Не вдалося надіслати лист для підтвердження.");
    } finally {
      setSendingVerification(false);
    }
  };

  const handleSoftDelete = async () => {
    try {
      await softDeleteUser();
      toast.success("Акаунт успішно м'яко видалено.");
      dispatch(logoutUser());
    } catch (error) {
      console.error("Помилка м'якого видалення акаунта:", error.message);
      toast.error("Не вдалося м'яко видалити акаунт.");
    }
  };

  const handleRestore = async () => {
    try {
      await restoreUser();
      toast.success("Акаунт успішно відновлено.");
    } catch (error) {
      console.error("Помилка відновлення акаунта:", error.message);
      toast.error("Не вдалося відновити акаунт.");
    }
  };

  if (loading) {
    return <p>Завантаження...</p>;
  }

  return (
    <motion.section
      className={styles["user-data"]}
      initial="hidden"
      animate="visible"
      variants={animationsProfile.tab}
    >
      <div className="flex flex-col items-center">
        <img
          className={styles["avatar"]}
          src={`${imagesBaseUrl}${user.avatar_url}`}
          alt="Аватар"
        />
        <div className={styles["info"]}>
          <p className={styles["user-info"]}>
            <strong>Нік:</strong> {user.username}
          </p>
          <p className={styles["user-info"]}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles["user-info"]}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <strong>Ім'я та прізвище:</strong> {user.first_name}{" "}
            {user.last_name}
          </p>
          <p className={styles["user-info"]}>
            <strong>Дата реєстрації:</strong>{" "}
            {formatMonthDayYear(user.created_at)}
          </p>
          {!user.deleted_at ? (
            <button className={styles["delete-btn"]} onClick={handleSoftDelete}>
              Видалити акаунт
            </button>
          ) : (
            <button className={styles["restore-btn"]} onClick={handleRestore}>
              Відновити акаунт
            </button>
          )}
        </div>
        <section className={styles["btn-section"]}>
          {!user.email_verified && (
            <button
              className={styles["confirm-btn"]}
              onClick={handleResendVerification}
              disabled={sendingVerification}
            >
              {sendingVerification ? "Відправлення..." : "Підтвердити Email"}
            </button>
          )}
          {subscribed ? (
            <button
              className={styles["unsubscribe-btn"]}
              onClick={handleUnsubscribe}
            >
              Відписатися
            </button>
          ) : (
            <button
              className={styles["subscribe-btn"]}
              onClick={handleSubscribe}
            >
              Підписатися
            </button>
          )}
          <button className={styles["logout-btn"]} onClick={handleLogout}>
            Вийти
          </button>
        </section>
      </div>
      <div>
        <FontAwesomeIcon
          icon={user.email_verified ? faCheckCircle : faTimesCircle}
          size="xl"
          className={`${
            user.email_verified ? styles["verified"] : styles["not-verified"]
          } ${styles["icon"]}`}
          data-tooltip-id="email-tooltip"
          data-tooltip-place="top"
        />
        <Tooltip id="email-tooltip">
          {user.email_verified ? "Email підтверджено" : "Email не підтверджено"}
        </Tooltip>
      </div>
    </motion.section>
  );
};

TabProfile.propTypes = {
  onUsernameLoad: PropTypes.string.isRequired,
};

export default TabProfile;
