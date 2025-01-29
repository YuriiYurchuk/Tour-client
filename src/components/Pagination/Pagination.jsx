import PropTypes from "prop-types";
import styles from "./Pagination.module.scss";
import next from "../../assets/images/next-arrow.svg";
import prev from "../../assets/images/prev-arrow.svg";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles["pagination-container"]}>
      <button
        className={styles["pagination-btn"]}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <img src={prev} alt="" />
      </button>
      <span className={styles["page-info"]}>
        {currentPage} з {totalPages}
      </span>
      <button
        className={styles["pagination-btn"]}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <img src={next} alt="" />
      </button>
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
