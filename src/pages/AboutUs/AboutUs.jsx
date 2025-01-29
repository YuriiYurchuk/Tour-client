import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import AboutUsComponents from "@components/AboutUs/AboutUsComponents";
import imgDesktop from "../../assets/images/About/banner-about-desktop.webp";
import imgTablet from "../../assets/images/About/banner-about-tablet.webp";
import imgMobile from "../../assets/images/About/banner-about-mobile.webp";
import styles from "./AboutUs.module.scss";

const AboutPage = () => {
  return (
    <section className={styles["about"]}>
      <Banner
        title="Про нас"
        subtitle="Наші історія та цінності: Ваш надійний провідник у світі подорожей"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <AboutUsComponents />
    </section>
  );
};

export default AboutPage;
