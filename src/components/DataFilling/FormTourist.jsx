import Input from "@components/UI/Input/Input";
import DropdownWithInput from "@components/UI/Dropdown/DropdownWithInput";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "./DataFilling.module.scss";
import PropTypes from "prop-types";

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
const currentYear = new Date().getFullYear();
const birthYears = Array.from({ length: 100 }, (_, i) =>
  String(currentYear - i)
);
const issuedYears = Array.from({ length: 11 }, (_, i) =>
  String(currentYear - i)
);
const validYears = Array.from({ length: 11 }, (_, i) =>
  String(currentYear + i)
);

const FormTourist = ({ control, index }) => {
  const month = useWatch({ control, name: `tourists.${index}.birth_month` });
  const year = useWatch({ control, name: `tourists.${index}.birth_year` });

  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const monthIndex = months.indexOf(month);
    const numericYear = parseInt(year, 10) || currentYear;

    if (monthIndex !== -1) {
      const days = new Date(numericYear, monthIndex + 1, 0).getDate();
      const daysArray = Array.from({ length: days }, (_, i) =>
        String(i + 1).padStart(2, "0")
      );
      setDaysInMonth(daysArray);
    }
  }, [month, year]);

  return (
    <div className={styles["tourist-container"]}>
      <h3 className={styles["tourist"]}>Турист {index + 1}</h3>
      <h4 className={styles["title"]}>Основні дані</h4>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <Input
          name={`tourists.${index}.first_name`}
          control={control}
          label="Ім'я"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <Input
          name={`tourists.${index}.last_name`}
          control={control}
          label="Прізвище"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <DropdownWithInput
          name={`tourists.${index}.salutation`}
          control={control}
          label="Звернення"
          options={["Mr", "Mrs", "Chd"]}
          rules={{ required: "Оберіть звернення" }}
          className="w-full"
        />
        <DropdownWithInput
          name={`tourists.${index}.gender`}
          control={control}
          label="Стать"
          options={["Чоловік", "Жінка"]}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <Input
          name={`tourists.${index}.country_of_birth`}
          control={control}
          label="Країна народження"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <Input
          name={`tourists.${index}.citizenship`}
          control={control}
          label="Громадянство"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <p className={styles["date"]}>Дата народження</p>
      <div className="flex gap-2 mb-10">
        <DropdownWithInput
          name={`tourists.${index}.birth_day`}
          control={control}
          label="День"
          options={daysInMonth}
          rules={{ required: "Поле обов'язкове" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.birth_month`}
          control={control}
          label="Місяць"
          options={months}
          rules={{ required: "Поле обов'язкове" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.birth_year`}
          control={control}
          label="Рік"
          options={birthYears}
          rules={{ required: "Поле обов'язкове" }}
        />
      </div>
      <h4 className={styles["title"]}>Паспорті дані</h4>
      <Input
        name={`tourists.${index}.document_type`}
        control={control}
        label="Тип документа"
        rules={{ required: "Поле обов'язкове" }}
        className="mb-4"
      />
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <Input
          name={`tourists.${index}.document_series`}
          control={control}
          label="Серія документа"
          className="w-full"
        />
        <Input
          name={`tourists.${index}.document_number`}
          control={control}
          label="Номер документа"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <p className={styles["date"]}>Дата видачі</p>
      <div className="flex gap-2 mb-4">
        <DropdownWithInput
          name={`tourists.${index}.issued_day`}
          control={control}
          label="День"
          options={daysInMonth}
          rules={{ required: "Поле обов'язкове" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.issued_month`}
          control={control}
          label="Місяць"
          options={months}
          rules={{ required: "Поле обов'язкове" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.issued_year`}
          control={control}
          label="Рік"
          options={issuedYears}
        />
      </div>
      <p className={styles["date"]}>Дійсний до</p>
      <div className="flex gap-2 mb-10">
        <DropdownWithInput
          name={`tourists.${index}.valid_day`}
          control={control}
          label="День"
          options={daysInMonth}
          rules={{ required: "Поле обов'язкове" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.valid_month`}
          control={control}
          label="Місяць"
          options={months}
          rules={{ required: "Поле обов'язкове" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.valid_year`}
          control={control}
          label="Рік"
          options={validYears}
          rules={{ required: "Поле обов'язкове" }}
        />
      </div>
      <h4 className={styles["title"]}>Контактні дані</h4>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <Input
          name={`tourists.${index}.phone_number`}
          control={control}
          label="Номер телефону"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <Input
          name={`tourists.${index}.email`}
          control={control}
          label="Email"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
    </div>
  );
};

FormTourist.propTypes = {
  control: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default FormTourist;
