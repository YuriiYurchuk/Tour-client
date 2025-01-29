import { useState } from "react";
import Modal from "@components/UI/Modal/Modal";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { uk } from "date-fns/locale";
import { addDays, differenceInDays } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./index.scss";
import styles from "./Modal.module.scss";

const ModalCalendar = ({ isOpen, onClose, onDateSelect }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [error, setError] = useState("");

  const today = new Date();
  const minDate = addDays(today, 3);

  const handleDateChange = (dates) => {
    setDateRange(dates);
    setError(""); // Очистити помилку при зміні дат
  };

  const handleConfirm = () => {
    if (dateRange[0] && dateRange[1]) {
      const selectedDays = differenceInDays(dateRange[1], dateRange[0]);
      if (selectedDays < 5) {
        setError("Мінімальний діапазон дат повинен бути не менше 5 днів.");
        return;
      }
      onDateSelect(dateRange);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overlayClassName={styles["overlay"]}
      modalClassName={styles["modal-calendar"]}
      contentClassName={styles["content-calendar"]}
    >
      <Calendar
        value={dateRange}
        onChange={handleDateChange}
        locale={uk}
        selectRange={true}
        minDate={minDate}
        defaultValue={minDate}
      />
      <div className="flex flex-col mt-4">
        <div className="flex justify-between items-center">
          <div>
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="lg"
              className="text-gray-500 cursor-pointer"
              data-tooltip-id="calendar-tooltip"
              data-tooltip-place="top"
            />
            <Tooltip id="calendar-tooltip">
              Виберіть діапазон дат, починаючи з{" "}
              {minDate.toLocaleDateString("uk-UA")}. Мінімальний діапазон — 5
              днів.
            </Tooltip>
          </div>
          <button
            onClick={handleConfirm}
            disabled={!dateRange[0] || !dateRange[1]}
            className="bg-stone-900 text-white py-2 px-4 rounded disabled:opacity-50"
          >
            Підтвердити вибір
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </Modal>
  );
};

ModalCalendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDateSelect: PropTypes.func.isRequired,
};

export default ModalCalendar;
