import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import imgDesktop from "../../assets/images/Countries/banner-countries-desktop.webp";
import imgTablet from "../../assets/images/Countries/banner-countries-tablet.webp";
import imgMobile from "../../assets/images/Countries/banner-countries-mobile.webp";
import CountriesSection from "@components/Countries/Countries";
import styles from "./Countries.module.scss";

const Countries = () => {
  return (
    <section className={styles["countries"]}>
      <Banner
        title="Країни"
        subtitle="Досліджуйте світ: Наші найкращі напрямки та країни для подорожей"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <CountriesSection />
    </section>
  );
};

export default Countries;
