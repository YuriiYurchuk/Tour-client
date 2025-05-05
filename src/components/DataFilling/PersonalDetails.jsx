import styles from "./DataFilling.module.scss";
import FormTourist from "./FormTourist";
import FormContract from "./FormContract";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { sendBookingDetails } from "@api/bookingApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { formatDateComparison } from "@utils/formatDate";
import star from "../../assets/images/filled-star-icon.svg";

const months = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const PersonalDetails = () => {
  const { booking, loading } = useSelector((state) => state.booking);
  const { selectedServices } = useSelector((state) => state.services);
  const navigate = useNavigate();
  const numberOfTourists =
    booking.number_of_tourists + booking.number_of_children;

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  const methods = useForm({
    defaultValues: {
      tourists:
        booking?.tourists?.map((tourist) => ({
          fullName: tourist.fullName || "",
          passport: tourist.passport || "",
          country: tourist.country || "",
        })) || [],
      first_name: "",
      last_name: "",
      gender: "",
      phone_number: "",
      email: "",
      citizenship: "",
      birth_day: "",
      birth_month: "",
      birth_year: "",
      issued_day: "",
      issued_month: "",
      issued_year: "",
    },
  });

  const onSubmit = async (data) => {
    const getDate = (day, month, year) => {
      if (!day || !month || !year) return null;
      const monthIndex = months.indexOf(month);
      if (monthIndex === -1) return null;
      const dateStr = `${year}-${String(monthIndex + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      const isValid = !isNaN(Date.parse(dateStr));
      return isValid ? dateStr : null;
    };

    const formattedTourists = data.tourists.map((tourist) => ({
      ...tourist,
      date_of_birth: getDate(
        tourist.birth_day,
        tourist.birth_month,
        tourist.birth_year
      ),
      document_issued_date: getDate(
        tourist.issued_day,
        tourist.issued_month,
        tourist.issued_year
      ),
      document_valid_until: getDate(
        tourist.valid_day,
        tourist.valid_month,
        tourist.valid_year
      ),
    }));

    const contactPerson = {
      first_name: data.first_name,
      last_name: data.last_name,
      middle_name: data.middle_name,
      phone_number: data.phone_number,
      email: data.email,
      citizenship: data.citizenship,
      date_of_birth: getDate(data.birth_day, data.birth_month, data.birth_year),
      document_issued_date: getDate(
        data.issued_day,
        data.issued_month,
        data.issued_year
      ),
      document_number: data.document_number,
      document_type: data.document_type,
      document_series: data.document_series,
      registration_address: data.registration_address,
    };

    try {
      await sendBookingDetails(booking.id, {
        contract: contactPerson,
        tourists: formattedTourists,
        services: selectedServices,
      });
      navigate(`/booking/${booking.id}/payment`);
      toast.success("Дані успішно відправлені!");
    } catch (error) {
      console.error("Помилка при надсиланні:", error);
      toast.error("Не вдалося надіслати дані.");
      console.log(contactPerson);
    }
  };

  if (loading || !booking) return <p>Завантаження...</p>;

  return (
    <section className="container">
      <section className={styles["personal-details"]}>
        <FormProvider {...methods} key={numberOfTourists}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={styles.form}
          >
            {Array.from({ length: numberOfTourists }).map((_, index) => (
              <FormTourist
                key={`tourist-${booking.id}-${index}`}
                control={methods.control}
                index={index}
              />
            ))}
            <FormContract control={methods.control} />
            <button className={styles["submit-button"]} type="submit">
              Надіслати
            </button>
          </form>
        </FormProvider>
        <div className={styles["card-booking"]}>
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
              onClick={methods.handleSubmit(onSubmit)}
            >
              Продовжити
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default PersonalDetails;
