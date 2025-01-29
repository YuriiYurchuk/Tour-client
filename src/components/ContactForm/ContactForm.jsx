import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import styles from "./ContactForm.module.scss";
import { animationsContactForm } from "./animations";
import Input from "@components/UI/Input/Input";
import { handleContact } from "../../services/contactService";

const ContactForm = ({ title, text }) => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    handleContact(data);
  };

  return (
    <section className="container">
      <motion.section
        className={styles["section-form"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsContactForm.section}
      >
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsContactForm.title}
        >
          {title}
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={animationsContactForm.text}
        >
          {text}
        </motion.p>
        <form
          className={styles["contact-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <motion.div
            className={styles["form-fields"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsContactForm.form}
          >
            <Input
              name="name"
              control={control}
              placeholder="Ім'я"
              rules={{ required: "Введіть ваше ім'я" }}
              label="Ім'я"
              className={styles["form-contact"]}
              inputClassName={styles["form-contact__input"]}
              labelClassName={styles["form-contact__label"]}
            />
            <Input
              name="phone_number"
              control={control}
              placeholder="Номер"
              rules={{
                required: "Введіть номер телефону",
                pattern: {
                  value: /^\+?\d{10,13}$/,
                  message: "Неправильний формат номеру",
                },
              }}
              label="Телефон"
              type="tel"
              className={styles["form-contact"]}
              inputClassName={styles["form-contact__input"]}
              labelClassName={styles["form-contact__label"]}
            />
          </motion.div>
          <motion.button
            type="submit"
            className={styles["submit-button"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsContactForm.button}
          >
            Відправити
          </motion.button>
        </form>
      </motion.section>
    </section>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
};
