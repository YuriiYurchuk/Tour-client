import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form"; // Імпортуємо useForm
import styles from "./Profile.module.scss";
import { updateUserProfile } from "@api/userApi";
import { logoutUser } from "../../redux/slices/authSlice";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@components/UI/Input/Input";

const TabSetting = () => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();

  const [avatar, setAvatar] = useState(null);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const onSubmit = async (formData) => {
    try {
      await updateUserProfile(formData, avatar);
      if (formData.email || formData.new_password) {
        dispatch(logoutUser());
      }
      toast.success("Профіль оновлено успішно");
    } catch {
      toast.error("Помилка оновлення профілю");
    }
  };

  return (
    <section className={styles["user-update"]}>
      <div className="flex items-center gap-3">
        <h2 className={styles["title"]}>Оновити профіль</h2>
        <FontAwesomeIcon
          icon={faInfoCircle}
          size="sm"
          data-tooltip-id="email-tooltip"
          data-tooltip-place="top"
        />
        <Tooltip id="email-tooltip">
          Ви можете змінити тільки ті поля, які хочете оновити. Інші поля не
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          обов'язкові для заповнення.
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["form-group"]}>
          <Input name="first_name" control={control} placeholder="Ім'я" />
        </div>
        <div className={styles["form-group"]}>
          <Input name="last_name" control={control} placeholder="Прізвище" />
        </div>
        <div className={styles["form-group"]}>
          <Input
            name="email"
            control={control}
            placeholder="Електрона пошта"
            type="email"
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Невірний формат електронної пошти",
              },
            }}
          />
        </div>
        <div className={styles["form-group"]}>
          <Input
            name="current_password"
            control={control}
            placeholder="Поточний пароль"
            type="password"
          />
        </div>
        <div className={styles["form-group"]}>
          <Input
            name="new_password"
            control={control}
            placeholder="Новий пароль"
            type="password"
            rules={{
              minLength: {
                value: 6,
                message: "Пароль має бути не менше 6 символів",
              },
            }}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="avatar" className="mb-2">
            Аватар:
          </label>
          <input
            type="file"
            id="avatar"
            onChange={handleAvatarChange}
            className={styles["file-input"]}
          />
        </div>
        <button type="submit" className={styles["submit-btn"]}>
          Оновити
        </button>
      </form>
    </section>
  );
};

export default TabSetting;
