import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import imgDesktop from "../../assets/images/Hotels/banner-tour-selection-desktop.webp";
import imgTablet from "../../assets/images/Hotels/banner-tour-selection-tablet.webp";
import imgMobile from "../../assets/images/Hotels/banner-tour-selection-mobile.webp";
import SwiperRating from "@components/Hotels/SwiperRating";
import SwiperPopular from "@components/Hotels/SwiperPopular";
import AllHotels from "@components/Hotels/AllHotels";
import ContactForm from "@components/ContactForm/ContactForm";
import styles from "./Hotels.module.scss";

const Hotels = () => {
  return (
    <section className={styles["hotels"]}>
      <Banner
        title="Готелі"
        subtitle="Ідеальні готелі для вашого відпочинку"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <SwiperPopular />
      <section className={styles["section-rating"]}>
        <SwiperRating />
      </section>
      <section className="container">
        <AllHotels />
      </section>
      <section className={styles["contact-form-wrapper"]}>
        <ContactForm
          title="МИ ДОПОМОЖЕМО СТВОРИТИ ВАШУ ПОДОРОЖ"
          text="Залишіть заявку на підбір ідеальної подорожі"
        />
      </section>
    </section>
  );
};

export default Hotels;
