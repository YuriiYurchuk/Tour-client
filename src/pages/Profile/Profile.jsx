import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TabProfile from "@components/Profile/TabProfile";
import TabSetting from "@components/Profile/TabSetting";
import TabReviews from "@components/Profile/TabReviews";
import TabBooking from "@components/Profile/TabBooking";
import TabUsers from "@components/Profile/TabUsers";
import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import imgDesktop from "../../assets/images/Profile/banner-profile-desktop.webp";
import imgTablet from "../../assets/images/Profile/banner-profile-tablet.webp";
import imgMobile from "../../assets/images/Profile/banner-profile-mobile.webp";
import styles from "./Profile.module.scss";
import { useSelector } from "react-redux";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "user";

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getTabsByRole = (role) => {
    switch (role) {
      case "admin":
        return {
          profile: <TabProfile onUsernameLoad={setUsername} />,
          setting: <TabSetting />,
          users: <TabUsers />,
        };
      case "manager":
        return {
          profile: <TabProfile onUsernameLoad={setUsername} />,
          booking: <TabBooking />,
        };
      default:
        return {
          profile: <TabProfile onUsernameLoad={setUsername} />,
          setting: <TabSetting />,
          reviews: <TabReviews />,
          booking: <TabBooking />,
        };
    }
  };

  const tabComponents = getTabsByRole(role);
  const availableTabs = Object.keys(tabComponents);

  const tabLabels = {
    profile: "Профіль",
    setting: "Налаштування",
    reviews: "Відгуки",
    booking: "Бронювання",
    users: "Користувачі",
    analytics: "Аналітика",
    schedule: "Розклад",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className={styles["profile"]}>
      <Banner
        title="Профіль"
        subtitle={`Ласкаво просимо ${username}`}
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <motion.section
        className={`container ${styles["section-btn"]}`}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {availableTabs.map((tabKey) => (
          <motion.button
            key={tabKey}
            className={activeTab === tabKey ? styles.active : styles.inactive}
            onClick={() => setActiveTab(tabKey)}
            variants={buttonVariants}
          >
            {tabLabels[tabKey] || tabKey}
          </motion.button>
        ))}
      </motion.section>
      <section className={`container ${styles["profile-section"]}`}>
        {tabComponents[activeTab] || null}
      </section>
    </section>
  );
};

export default Profile;
