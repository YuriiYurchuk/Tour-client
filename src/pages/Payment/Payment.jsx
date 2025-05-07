import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import PaymentComponents from "@components/Payment/Payment";
import imgDesktop from "../../assets/images/Payment/banner-payment-desktop.webp";
import imgTablet from "../../assets/images/Payment/banner-payment-tablet.webp";
import imgMobile from "../../assets/images/Payment/banner-payment-mobile.webp";
import styles from "./Payment.module.scss";

const Payment = () => {
  return (
    <section className={styles["payment"]}>
      <Banner
        title="онлайн оплата"
        subtitle="Швидко, зручно та безпечно: Оплачуйте свої мрії у кілька кліків"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <PaymentComponents />
    </section>
  );
};

export default Payment;
