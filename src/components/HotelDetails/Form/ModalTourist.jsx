import Modal from "@components/UI/Modal/Modal";
import PropTypes from "prop-types";

const ModalTourist = ({ isOpen, onClose }) => {
  return <Modal isOpen={isOpen} onClose={onClose}></Modal>;
};

ModalTourist.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalTourist;
