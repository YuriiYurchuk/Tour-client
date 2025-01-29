import Banner from "@components/Banner/Banner";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import ContactsComponents from "@components/Contacts/ContactsComponents";
import imgDesktop from "../../assets/images/Contacts/banner-contacts-desktop.webp";
import imgTablet from "../../assets/images/Contacts/banner-contacts-tablet.webp";
import imgMobile from "../../assets/images/Contacts/banner-contacts-mobile.webp";
import styles from "./Contacts.module.scss";

const ContactsPage = () => {
  return (
    <section className={styles["contacts"]}>
      <Banner
        title="Контакти"
        subtitle="Зв'яжіться з нами та створіть свою незабутню подорож"
        desktopImage={imgDesktop}
        tabletImage={imgTablet}
        mobileImage={imgMobile}
      />
      <Breadcrumbs />
      <ContactsComponents />
    </section>
  );
};

export default ContactsPage;
