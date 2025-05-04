import styles from "./DataFilling.module.scss";
import FormTourist from "./FormTourist";
import FormContract from "./FormContract";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { sendBookingDetails } from "@api/bookingApi";
import { toast } from "react-toastify";

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
  const numberOfTourists =
    booking.number_of_tourists + booking.number_of_children;

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
      const monthIndex = months.indexOf(month) + 1;
      return `${year}-${String(monthIndex).padStart(2, "0")}-${day}`;
    };

    const formattedTourists = data.tourists.map((tourist) => ({
      ...tourist,
      birth_date: getDate(
        tourist.birth_day,
        tourist.birth_month,
        tourist.birth_year
      ),
      passport_issued_date: getDate(
        tourist.issued_day,
        tourist.issued_month,
        tourist.issued_year
      ),
      passport_valid_until: getDate(
        tourist.valid_day,
        tourist.valid_month,
        tourist.valid_year
      ),
    }));

    const contactPerson = {
      first_name: data.first_name,
      last_name: data.last_name,
      gender: data.gender,
      phone_number: data.phone_number,
      email: data.email,
      citizenship: data.citizenship,
      birth_date: getDate(data.birth_day, data.birth_month, data.birth_year),
      passport_issued_date: getDate(
        data.issued_day,
        data.issued_month,
        data.issued_year
      ),
    };

    try {
      await sendBookingDetails(booking.id, {
        contract: contactPerson,
        tourists: formattedTourists,
        services: selectedServices,
      });

      toast.success("Дані успішно відправлені!");
    } catch (error) {
      console.error("Помилка при надсиланні:", error);
      toast.error("Не вдалося надіслати дані.");
    }
  };

  if (loading || !booking) return <p>Завантаження...</p>;

  return (
    <div className="mb-16">
      <FormProvider {...methods} key={numberOfTourists}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          {Array.from({ length: numberOfTourists }).map((_, index) => (
            <FormTourist key={index} control={methods.control} index={index} />
          ))}
          <FormContract control={methods.control} />
          <button type="submit">Надіслати</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalDetails;
