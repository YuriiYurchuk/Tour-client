import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import closeIcon from "../../../assets/images/close-icon.svg";
import styles from "./Modal.module.scss";

const Modal = ({
  isOpen,
  onClose,
  children,
  overlayClassName = "",
  modalClassName = "",
  contentClassName = "",
  closeOnOverlay = true,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleClose = useCallback(() => {
    setIsActive(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      requestAnimationFrame(() => setIsActive(true));

      const handleEscPress = (e) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleEscPress);

      return () => {
        document.documentElement.style.overflow = "";
        document.body.style.paddingRight = "";
        window.removeEventListener("keydown", handleEscPress);
      };
    }
  }, [isOpen, handleClose]);

  const handleOverlayClick = useCallback(
    (e) => {
      if (closeOnOverlay && e.target.classList.contains(styles.overlay)) {
        handleClose();
      }
    },
    [handleClose, closeOnOverlay]
  );

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.overlay} ${
        isActive ? styles.active : ""
      } ${overlayClassName}`}
      onClick={closeOnOverlay ? handleOverlayClick : undefined}
      aria-modal="true"
      role="dialog"
    >
      <div className={`${styles.modal} ${modalClassName}`}>
        <div
          className={`${styles.content} ${
            isActive ? styles.active : ""
          } ${contentClassName}`}
        >
          <button
            className={styles["close-button"]}
            onClick={handleClose}
            aria-label="Close modal"
          >
            <img src={closeIcon} alt="" />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  overlayClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  closeOnOverlay: PropTypes.bool,
};

export default Modal;
