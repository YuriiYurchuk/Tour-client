import { useState } from "react";
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

  const tabComponents = {
    profile: <TabProfile onUsernameLoad={setUsername} />,
    setting: <TabSetting />,
    reviews: <TabReviews />,
    booking: <TabBooking />,
  };

  return (
    <section className="mb-20">
      <Banner
        title="Профіль"
        subtitle={`Ласкаво просимо ${username}`}
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <section className={`container ${styles["section-btn"]}`}>
        <button
          className={activeTab === "profile" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("profile")}
        >
          Профіль
        </button>
        <button
          className={activeTab === "setting" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("setting")}
        >
          Налаштування
        </button>
        <button
          className={activeTab === "reviews" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("reviews")}
        >
          Відгуки
        </button>
        <button
          className={activeTab === "booking" ? styles.active : styles.inactive}
          onClick={() => setActiveTab("booking")}
        >
          Бронювання
        </button>
      </section>

      <section className="container">
        {tabComponents[activeTab] || null}
      </section>
    </section>
  );
};

export default Profile;
