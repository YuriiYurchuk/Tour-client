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

const FormContract = ({ control }) => {
  const month = useWatch({ control, name: "birth_month" });
  const year = useWatch({ control, name: "birth_year" });

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
      <h3 className={styles["contract"]}>
        Дані про замовника для укладання договору
      </h3>
      <h4 className={styles["title"]}>Основні дані</h4>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-4">
        <Input
          name="first_name"
          control={control}
          label="Ім'я"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <Input
          name="last_name"
          control={control}
          label="Прізвище"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-4">
        <Input
          name="middle_name"
          control={control}
          label="По батькові"
          className="w-full"
        />
        <Input
          name="citizenship"
          control={control}
          label="Громадянство"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <p className={styles["date"]}>Дата народження</p>
      <div className="flex gap-2 mb-4">
        <DropdownWithInput
          name="birth_day"
          control={control}
          label="День"
          options={daysInMonth}
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <DropdownWithInput
          name="birth_month"
          control={control}
          label="Місяць"
          options={months}
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <DropdownWithInput
          name="birth_year"
          control={control}
          label="Рік"
          options={birthYears}
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <h4 className={styles["title"]}>Паспортні дані</h4>
      <Input
        name="document_type"
        control={control}
        label="Тип документа"
        rules={{ required: "Поле обов'язкове" }}
        className="mb-4"
      />
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <Input
          name="document_series"
          control={control}
          label="Серія документа"
          className="w-full"
        />
        <Input
          name="document_number"
          control={control}
          label="Номер документа"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <p className={styles["date"]}>Дата видачі документа</p>
      <div className="flex gap-2 mb-4">
        <DropdownWithInput
          name="issued_day"
          control={control}
          label="День"
          options={daysInMonth}
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <DropdownWithInput
          name="issued_month"
          control={control}
          label="Місяць"
          options={months}
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <DropdownWithInput
          name="issued_year"
          control={control}
          label="Рік"
          options={issuedYears}
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <h4 className={styles["title"]}>Контактні дані</h4>
      <div className="flex flex-col gap-4 mb-4 xs-plus:flex-row xs-plus:gap-2">
        <Input
          name="phone_number"
          control={control}
          label="Номер телефону"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
        <Input
          name="email"
          control={control}
          label="Email"
          rules={{ required: "Поле обов'язкове" }}
          className="w-full"
        />
      </div>
      <Input
        name="registration_address"
        control={control}
        label="Адреса реєстрації"
        rules={{ required: "Поле обов'язкове" }}
        className="mb-6"
      />
    </div>
  );
};

FormContract.propTypes = {
  control: PropTypes.object.isRequired,
};

export default FormContract;
