import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { loginUser } from "../../redux/slices/authSlice";
import Input from "../UI/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import styles from "./Form.module.scss";
import { animationsLoginRegister } from "./animations";

function Login({ toggleForm }) {
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <motion.article
      className={styles["form"]}
      {...animationsLoginRegister.page}
    >
      <motion.h2
        className={`text-6xl normal-case mb-10 ${styles["login-title"]}`}
        {...animationsLoginRegister.title}
      >
        Вхід
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        {...animationsLoginRegister.form}
      >
        <Input
          name="loginInput"
          control={control}
          rules={{ required: "Це поле обов'язкове" }}
          label="Email або Username"
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
        <button
          type="submit"
          className={`${styles["submit"]} ${styles["flash-submit"]}`}
        >
          Увійти
        </button>
      </motion.form>
      <motion.div
        className="mt-10 flex items-center gap-5"
        {...animationsLoginRegister.buttons}
      >
        <button className={styles["switch-form-btn"]} onClick={toggleForm}>
          Зареєструйтесь
        </button>
        <Link to="/" className={styles["link-home"]}>
          На головну
        </Link>
      </motion.div>
    </motion.article>
  );
}

Login.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default Login;
