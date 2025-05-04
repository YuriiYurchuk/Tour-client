import styles from "./DataFilling.module.scss";
import FormTourist from "./FormTourist";
import { useForm, FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";

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
    },
  });

  const onSubmit = (data) => {
    const formattedTourists = data.tourists.map((tourist) => {
      const getDate = (day, month, year) => {
        const monthIndex = months.indexOf(month) + 1;
        return `${year}-${String(monthIndex).padStart(2, "0")}-${day}`;
      };

      return {
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
      };
    });

    console.log("Formatted tourists", formattedTourists);
  };

  if (loading || !booking) return <p>Завантаження...</p>;

  return (
    <div className="mb-16">
      <FormProvider {...methods} key={numberOfTourists}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
          {Array.from({ length: numberOfTourists }).map((_, index) => (
            <FormTourist key={index} control={methods.control} index={index} />
          ))}
          <button type="submit">Надіслати</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default PersonalDetails;
