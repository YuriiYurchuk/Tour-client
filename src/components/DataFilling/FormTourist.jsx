import Input from "@components/UI/Input/Input";
import DropdownWithInput from "@components/UI/Dropdown/DropdownWithInput";
import { useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import styles from "./DataFilling.module.scss";

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
    <div className={styles["tourist-  container"]}>
      <h3 className={styles["tourist"]}>Турист {index + 1}</h3>
      <h4 className={styles["title"]}>Основні дані</h4>
      <div className="flex gap-2">
        <Input
          name={`tourists.${index}.first_name`}
          control={control}
          label="Ім'я"
          rules={{ required: "Поле обов'язкове" }}
        />
        <Input
          name={`tourists.${index}.last_name`}
          control={control}
          label="Прізвище"
          rules={{ required: "Поле обов'язкове" }}
        />
      </div>
      <div className="flex gap-2">
        <DropdownWithInput
          name={`tourists.${index}.salutation`}
          control={control}
          label="Звернення"
          options={["Mr", "Mrs", "Chd"]}
          rules={{ required: "Оберіть звернення" }}
        />
        <DropdownWithInput
          name={`tourists.${index}.gender`}
          control={control}
          label="Стать"
          options={["Чоловік", "Жінка"]}
        />
      </div>
      <div className="flex gap-2">
        <Input
          name={`tourists.${index}.country_birth`}
          control={control}
          label="Країна народження"
          rules={{ required: "Поле обов'язкове" }}
        />
        <Input
          name={`tourists.${index}.citizenship`}
          control={control}
          label="Громадянство"
          rules={{ required: "Поле обов'язкове" }}
        />
      </div>
      <div className="flex gap-2">
        <DropdownWithInput
          name={`tourists.${index}.birth_day`}
          control={control}
          label="День"
          options={daysInMonth}
        />
        <DropdownWithInput
          name={`tourists.${index}.birth_month`}
          control={control}
          label="Місяць"
          options={months}
        />
        <DropdownWithInput
          name={`tourists.${index}.birth_year`}
          control={control}
          label="Рік"
          options={birthYears}
        />
      </div>
      <h4 className={styles["title"]}>Паспорті дані</h4>
      <Input
        name={`tourists.${index}.document_type`}
        control={control}
        label="Тип документа"
        rules={{ required: "Поле обов'язкове" }}
      />
      <div className="flex gap-2">
        <Input
          name={`tourists.${index}.document_series`}
          control={control}
          label="Серія документа"
        />
        <Input
          name={`tourists.${index}.document_number`}
          control={control}
          label="Номер документа"
          rules={{ required: "Поле обов'язкове" }}
        />
      </div>
      <p>Дата видачі</p>
      <div className="flex gap-2">
        <DropdownWithInput
          name={`tourists.${index}.issued_day`}
          control={control}
          label="День"
          options={daysInMonth}
        />
        <DropdownWithInput
          name={`tourists.${index}.issued_month`}
          control={control}
          label="Місяць"
          options={months}
        />
        <DropdownWithInput
          name={`tourists.${index}.issued_year`}
          control={control}
          label="Рік"
          options={issuedYears}
        />
      </div>
      <p>Дійсний до</p>
      <div className="flex gap-2">
        <DropdownWithInput
          name={`tourists.${index}.valid_day`}
          control={control}
          label="День"
          options={daysInMonth}
        />
        <DropdownWithInput
          name={`tourists.${index}.valid_month`}
          control={control}
          label="Місяць"
          options={months}
        />
        <DropdownWithInput
          name={`tourists.${index}.valid_year`}
          control={control}
          label="Рік"
          options={validYears}
        />
      </div>
      <h4 className={styles["title"]}>Контактні дані</h4>
      <div className="flex gap-2">
        <Input
          name={`tourists.${index}.phone_number`}
          control={control}
          label="Номер телефону"
        />
        <Input
          name={`tourists.${index}.email`}
          control={control}
          label="Email"
        />
      </div>
    </div>
  );
};

export default FormTourist;
