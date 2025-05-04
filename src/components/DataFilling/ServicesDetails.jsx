import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookingId } from "../../redux/slices/bookingSlice";
import { setSelectedServices } from "../../redux/slices/servicesSlice";
import star from "../../assets/images/filled-star-icon.svg";
import { formatDateComparison } from "@utils/formatDate";
import styles from "./DataFilling.module.scss";
import ModalServices from "@components/Modal/ModalServices";
import { MButton } from "@components/UI/Button/Button";
import click from "../../assets/images/click-icon.svg";
import { motion } from "framer-motion";
import { animationsFilling } from "./animations";

const ServicesDetails = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalService, setIsModalService] = useState(false);

  const { booking, loading, error } = useSelector((state) => state.booking);
  const selectedServices = useSelector(
    (state) => state.services.selectedServices
  );

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  const handleSelectServices = (services) => {
    dispatch(setSelectedServices(services));
  };

  const handleContinue = () => {
    if (booking?.id) {
      navigate(`/booking/${booking.id}/personal`);
    }
  };

  useEffect(() => {
    dispatch(fetchBookingId(bookingId));
  }, [dispatch, bookingId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      if (error === "Бронювання не підтверджено") {
        navigate("/");
      }
    }
  }, [error, navigate]);

  const toggleContainer = () => {
    setIsVisible(!isVisible);
  };

  if (loading) {
    return (
      <div className={styles["loader"]}>
        <div className={styles["spinner"]}></div>
      </div>
    );
  }

  if (!booking?.Hotel) {
    return <div>Дані не знайдено</div>;
  }

  const insuranceServices = selectedServices.filter(
    (service) => service.service_type === "страхування"
  );
  const transferServices = selectedServices.filter(
    (service) => service.service_type === "трансфер"
  );

  return (
    <section className="container">
      <section className={styles["services-details"]}>
        <div className={styles["services"]}>
          <div className={styles["services-update"]}>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              variants={animationsFilling.services}
              viewport={{ once: true, amount: 0.5 }}
            >
              Додаткові послуги
            </motion.h2>
            <div className="flex items-center gap-2">
              <MButton
                initial="hidden"
                whileInView="visible"
                variants={animationsFilling.services}
                viewport={{ once: true, amount: 0.5 }}
                onClick={() => setIsModalService(true)}
              >
                Змінити послуги
              </MButton>
              <button className={styles["click-btn"]} onClick={toggleContainer}>
                <img src={click} alt="click-icon" />
              </button>
            </div>
          </div>
          <div>
            <motion.h4
              initial="hidden"
              whileInView="visible"
              variants={animationsFilling.services}
              viewport={{ once: true, amount: 0.5 }}
            >
              Страхування
            </motion.h4>
            {insuranceServices.length > 0 ? (
              <ul className={styles["list-service"]}>
                {insuranceServices.map((service) => (
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    variants={animationsFilling.services}
                    viewport={{ once: true, amount: 0.5 }}
                    className={styles["item-service"]}
                    key={service.id}
                  >
                    <div>
                      <p>{service.name}</p>
                      <p>{service.details}</p>
                      <p>{service.insurance_period}</p>
                    </div>
                    <p className="whitespace-nowrap">{service.price} ₴</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="mb-4">Страхування не вибрано</p>
            )}
          </div>
          <div>
            <motion.h4
              initial="hidden"
              whileInView="visible"
              variants={animationsFilling.services}
              viewport={{ once: true, amount: 0.5 }}
            >
              Трансфер
            </motion.h4>
            {transferServices.length > 0 ? (
              <ul className={styles["list-service"]}>
                {transferServices.map((service) => (
                  <motion.li
                    initial="hidden"
                    whileInView="visible"
                    variants={animationsFilling.services}
                    viewport={{ once: true, amount: 0.5 }}
                    className={styles["item-service"]}
                    key={service.id}
                  >
                    <div>
                      <p>{service.name}</p>
                      <p>{service.details}</p>
                    </div>
                    <p className="whitespace-nowrap">{service.price} ₴</p>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="mb-5">Трансфер не вибрано</p>
            )}
          </div>
          <button
            className={`${styles["submit-button"]} ${styles["hidden-on-large"]}`}
            onClick={handleContinue}
          >
            Продовжити
          </button>
        </div>
        <div
          className={`${styles["card-booking"]} ${
            isVisible ? styles["visible"] : ""
          }`}
        >
          <img
            src={`${imagesBaseUrl}${booking.Hotel.hotel_photos}`}
            alt={booking?.description || `Фото ${booking.id}`}
            className={styles["image"]}
          />
          <p>
            {booking.Hotel.country}, {booking.Hotel.city}
          </p>
          <p className={styles["hotel-name"]}>{booking.Hotel.name}</p>
          <div className={styles["stars"]}>
            {Array.from({ length: booking.Hotel.star_rating }, (_, index) => (
              <img
                key={`star-${index}`}
                className={styles["star"]}
                src={star}
                alt="Star"
              />
            ))}
          </div>
          <time>
            Термін:{" "}
            <span>
              {formatDateComparison(booking.start_date, booking.end_date)}
            </span>
          </time>
          <p>
            Туристи:{" "}
            <span>
              {booking.number_of_children + booking.number_of_tourists}
            </span>
          </p>
          <p>
            Номер: <span>{booking.HotelRoomType.name}</span>
          </p>
          <p>
            Харчування: <span>{booking.HotelMealType.type_name}</span>
          </p>
          <p>
            Виліт: <span>{booking.departure_airport}</span>
          </p>
          <p className={styles["total-price"]}>
            Загальна сума: {booking.total_price} ₴
          </p>
          <div className="flex justify-center">
            <button
              className={styles["submit-button"]}
              onClick={handleContinue}
            >
              Продовжити
            </button>
          </div>
        </div>
      </section>
      <ModalServices
        isOpen={isModalService}
        onClose={() => setIsModalService(false)}
        onSelectServices={handleSelectServices}
      />
    </section>
  );
};

export default ServicesDetails;
