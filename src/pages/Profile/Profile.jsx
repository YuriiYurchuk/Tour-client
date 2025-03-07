import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TabProfile from "@components/Profile/TabProfile";
import TabSetting from "@components/Profile/TabSetting";
import TabReviews from "@components/Profile/TabReviews";
import TabBooking from "@components/Profile/TabBooking";
import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import imgDesktop from "../../assets/images/Profile/banner-profile-desktop.webp";
import imgTablet from "../../assets/images/Profile/banner-profile-tablet.webp";
import imgMobile from "../../assets/images/Profile/banner-profile-mobile.webp";
import styles from "./Profile.module.scss";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set isLoaded to true after component mounts to trigger animations
    setIsLoaded(true);
  }, []);

  const tabComponents = {
    profile: <TabProfile onUsernameLoad={setUsername} />,
    setting: <TabSetting />,
    reviews: <TabReviews />,
    booking: <TabBooking />,
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
        <motion.button
          className={activeTab === "profile" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("profile")}
          variants={buttonVariants}
        >
          Профіль
        </motion.button>
        <motion.button
          className={activeTab === "setting" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("setting")}
          variants={buttonVariants}
        >
          Налаштування
        </motion.button>
        <motion.button
          className={activeTab === "reviews" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("reviews")}
          variants={buttonVariants}
        >
          Відгуки
        </motion.button>
        <motion.button
          className={activeTab === "booking" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("booking")}
          variants={buttonVariants}
        >
          Бронювання
        </motion.button>
      </motion.section>
      <section className={`container ${styles["profile-section"]}`}>
        {tabComponents[activeTab] || null}
      </section>
    </section>
  );
};

export default Profile;
