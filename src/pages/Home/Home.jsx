import styles from "./Home.module.scss";
import BannerHome from "@components/Home/BannerHome";
import SwiperHot from "@components/Home/SwiperHot/SwiperHot";
import SwiperPopular from "@components/Home/SwiperPopular/SwiperPopular";
import ContactForm from "@components/ContactForm/ContactForm";
import SwiperReviews from "@components/Home/SwiperReviews/SwiperReviews";
import AboutHome from "@components/Home/AboutHome";
import OurContacts from "@components/Contacts/OurContacts";

const HomePage = () => {
  return (
    <div>
      <BannerHome />
      <SwiperHot />
      <SwiperPopular />
      <section className={styles["contact-form-wrapper1"]}>
        <ContactForm
          title="не визначились із вибором?"
          text="Залишіть свій номер і наш фахівець допоможе вам із підбором туру"
        />
      </section>
      <SwiperReviews />
      <AboutHome />
      <section className="container">
        <OurContacts />
      </section>
      <section className={styles["contact-form-wrapper2"]}>
        <ContactForm
          title="ми допоможемо створити вашу подорож"
          text="Залишіть заявку на підбір ідеальної подорожі"
        />
      </section>
    </div>
  );
};

export default HomePage;
