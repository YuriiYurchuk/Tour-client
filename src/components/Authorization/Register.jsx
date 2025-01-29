import { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../UI/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { handleRegister } from "../../services/registerService";
import PropTypes from "prop-types";
import styles from "./Form.module.scss";
import { animationsLoginRegister } from "./animations";

function Register({ toggleForm }) {
  const { handleSubmit, control, watch } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const password = watch("password");

  const onSubmit = (data) => handleRegister(data, toggleForm);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <motion.article
      className={styles["form"]}
      {...animationsLoginRegister.page}
    >
      <motion.h2
        className={`text-6xl normal-case mb-10 ${styles["register-title"]}`}
        {...animationsLoginRegister.title}
      >
        Реєстрація
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        {...animationsLoginRegister.form}
      >
        <Input
          name="username"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          label="Ім'я користувача"
          className={styles["form-input__auth"]}
          inputClassName={styles["input-auth"]}
          labelClassName={styles["label-auth"]}
        />
        <Input
          name="email"
          control={control}
          rules={{
            required: "Це поле обов'язкове",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Будь ласка, введіть правильну електронну пошту",
            },
          }}
          label="Електронна пошта"
          className={styles["form-input__auth"]}
          inputClassName={styles["input-auth"]}
          labelClassName={styles["label-auth"]}
        />
        <div className={styles["input-wrapper"]}>
          <Input
            name="password"
            control={control}
            type={showPassword ? "text" : "password"}
            rules={{ required: "Це поле обов'язкове" }}
            label="Пароль"
            className={styles["form-input__auth"]}
            inputClassName={styles["input-auth"]}
            labelClassName={styles["label-auth"]}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={styles["toggle-button"]}
            aria-label="Toggle password visibility"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className={styles["input-wrapper"]}>
          <Input
            name="confirmPassword"
            control={control}
            type={showPassword ? "text" : "password"}
            rules={{
              required: "Це поле обов'язкове",
              validate: (value) =>
                value === password || "Паролі не співпадають",
            }}
            label="Підтвердження паролю"
            className={styles["form-input__auth"]}
            inputClassName={styles["input-auth"]}
            labelClassName={styles["label-auth"]}
          />
        </div>
        <button
          type="submit"
          className={`${styles["submit"]} ${styles["flash-submit"]}`}
        >
          Зареєструватися
        </button>
      </motion.form>
      <motion.div
        className="mt-10 flex items-center gap-5"
        {...animationsLoginRegister.buttons}
      >
        <button className={styles["switch-form-btn"]} onClick={toggleForm}>
          Увійти
        </button>
        <Link to="/" className={styles["link-home"]}>
          На головну
        </Link>
      </motion.div>
    </motion.article>
  );
}

Register.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Register;
