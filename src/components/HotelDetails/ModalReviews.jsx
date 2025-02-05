import styles from "./ModalReviews.module.scss";
import Modal from "@components/UI/Modal/Modal";
import PropTypes from "prop-types";
import Input from "@components/UI/Input/Input";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { sendHotelReviews } from "@api/hotelReviewsApi";
import { toast } from "react-toastify";

const ModalReviews = ({ isOpen, onClose, hotelId }) => {
  const { control, handleSubmit } = useForm();
  const userId = useSelector((state) => state.auth.user?.id);

  const onSubmit = async (data) => {
    if (!userId) {
      toast.error("Ви повинні бути залогінені для створення відгуку!");
      return;
    }

    const reviewData = {
      hotel_id: hotelId,
      user_id: userId,
      rating: data.rating,
      comment: data.comment,
      food_rating: data.food_rating,
      room_rating: data.room_rating,
      staff_rating: data.staff_rating,
      price_rating: data.price_rating,
      beach_rating: data.beach_rating,
      animation_rating: data.animation_rating,
    };

    try {
      const response = await sendHotelReviews(reviewData);
      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success("Відгук успішно створено!");
      }

      onClose();
    } catch (error) {
      if (error?.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Помилка при створенні відгуку");
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName={styles["modal-reviews"]}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["reviews-form"]}
      >
        <div className={styles["ratings-container"]}>
          <Input
            name="food_rating"
            control={control}
            label="Оцінка їжі"
            type="number"
            rules={{
              required: "Поле обов'язкове",
              min: { value: 0, message: "Мінімум 0" },
              max: { value: 10, message: "Максиму 10" },
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
          />
          <Input
            name="room_rating"
            control={control}
            label="Оцінка кімнати"
            type="number"
            rules={{
              required: "Поле обов'язкове",
              min: { value: 0, message: "Мінімум 0" },
              max: { value: 10, message: "Максиму 10" },
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
          />
          <Input
            name="staff_rating"
            control={control}
            label="Оцінка персоналу"
            type="number"
            rules={{
              required: "Поле обов'язкове",
              min: { value: 0, message: "Мінімум 0" },
              max: { value: 10, message: "Максиму 10" },
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
          />
          <Input
            name="price_rating"
            control={control}
            label="Оцінка ціни"
            type="number"
            rules={{
              required: "Поле обов'язкове",
              min: { value: 0, message: "Мінімум 0" },
              max: { value: 10, message: "Максиму 10" },
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
          />
          <Input
            name="beach_rating"
            control={control}
            label="Оцінка пляжу"
            type="number"
            rules={{
              required: "Поле обов'язкове",
              min: { value: 0, message: "Мінімум 0" },
              max: { value: 10, message: "Максиму 10" },
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
          />
          <Input
            name="animation_rating"
            control={control}
            label="Оцінка анімації"
            type="number"
            rules={{
              required: "Поле обов'язкове",
              min: { value: 0, message: "Мінімум 0" },
              max: { value: 10, message: "Максиму 10" },
            }}
            inputProps={{
              min: 0,
              max: 10,
            }}
          />
        </div>
        <Input
          name="rating"
          control={control}
          label="Загальна оцінка"
          type="number"
          rules={{
            required: "Поле обов'язкове",
            min: { value: 0, message: "Мінімум 0" },
            max: { value: 10, message: "Максиму 10" },
          }}
          inputProps={{
            min: 0,
            max: 10,
          }}
        />
        <Input
          name="comment"
          control={control}
          label="Коментар"
          type="textarea"
          className={styles["reviews-textarea"]}
          rules={{
            maxLength: { value: 255, message: "Максимум 255 символів" },
          }}
        />
        <button type="submit" className={styles["submit-button"]}>
          Надіслати
        </button>
      </form>
    </Modal>
  );
};

ModalReviews.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  hotelId: PropTypes.number.isRequired,
};

export default ModalReviews;
