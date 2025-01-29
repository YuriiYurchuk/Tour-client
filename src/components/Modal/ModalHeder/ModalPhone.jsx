import { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Modal from "@components/UI/Modal/Modal";
import Input from "@components/UI/Input/Input";
import { handleContact } from "../../../services/contactService";
import styles from "./ModalPhone.module.scss";

const ModalLocation = ({ isOpen, onClose }) => {
  const { handleSubmit, control } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await handleContact(data, () => {
      setTimeout(() => {
        onClose();
      }, 500);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName={styles["modal-phone"]}
    >
      <div>
        <h2 className={styles["form-title"]}>Передзвонити вам?</h2>
        <p className={styles["form-text"]}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Залиште свій номер і наш спеціаліст зв'яжеться з вами
        </p>
        <form
          className={styles["contact-form"]}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            name="name"
            control={control}
            rules={{ required: "Введіть ваше ім'я" }}
            label="Ім'я"
            className={styles["form-contact"]}
            inputClassName={styles["form-contact__input"]}
          />
          <Input
            name="phone_number"
            control={control}
            rules={{
              required: "Введіть ваш номер телефону",
              pattern: {
                value: /^\+?\d{10,13}$/,
                message: "Неправильний формат телефону",
              },
            }}
            label="Телефон"
            type="tel"
            className={styles["form-contact"]}
            inputClassName={styles["form-contact__input"]}
          />
          <button
            type="submit"
            className={styles["submit-button"]}
            disabled={isSubmitting}
          >
            Відправити
          </button>
        </form>
      </div>
      <div className={styles["modal-phone__number"]}>
        <h2 className={`${styles["form-title__phone"]}`}>
          Або зателефонуйте нам самі:
        </h2>
        <a href="tel:+380501234567" className={styles["phone-link"]}>
          +380 (50) 123-45-67
        </a>
        <a href="tel:+380677654321" className={styles["phone-link"]}>
          +380 (67) 765-43-21
        </a>
      </div>
    </Modal>
  );
};

ModalLocation.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalLocation;
