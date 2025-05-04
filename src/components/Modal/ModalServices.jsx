import { useState } from "react";
import Modal from "@components/UI/Modal/Modal";
import PropTypes from "prop-types";
import styles from "./ModalServices.module.scss";
import { data } from "./data";

const ModalServices = ({ isOpen, onClose, onSelectServices }) => {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (service) => {
    setSelectedServices((prev) =>
      prev.some((s) => s.id === service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleConfirmSelection = () => {
    onSelectServices(selectedServices);
    onClose();
  };

  const groupedServices = data.reduce((acc, service) => {
    acc[service.service_type] = acc[service.service_type] || [];
    acc[service.service_type].push(service);
    return acc;
  }, {});

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      modalClassName={styles["modal-services"]}
      overlayClassName={styles["overlay-services"]}
      contentClassName={styles["content-services"]}
    >
      <section className={styles["service-content"]}>
        <h2>Зміна послуг</h2>
        {Object.entries(groupedServices).map(([category, services]) => (
          <section key={category} className={styles["section-category"]}>
            <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
            {services.map((service) => (
              <div key={service.id} className={styles["service-option"]}>
                <div className={styles["checkbox-wrapper"]}>
                  <input
                    type="checkbox"
                    checked={selectedServices.some((s) => s.id === service.id)}
                    onChange={() => handleServiceChange(service)}
                  />
                  <span className={styles["service-checkbox"]}></span>
                </div>
                <div>
                  <p>{service.name}</p>
                  <p className={styles["service-details"]}>{service.details}</p>
                  {category !== "трансфер" && <p>{service.insurance_period}</p>}
                  <p>
                    <strong>{service.price} ₴</strong>
                  </p>
                </div>
              </div>
            ))}
          </section>
        ))}
        <div className={styles["btn-service"]}>
          <button
            className={styles["apply-button"]}
            onClick={handleConfirmSelection}
          >
            Застосувати <span className={styles["arrow"]}></span>
          </button>
        </div>
      </section>
    </Modal>
  );
};

ModalServices.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelectServices: PropTypes.func.isRequired,
};

export default ModalServices;
