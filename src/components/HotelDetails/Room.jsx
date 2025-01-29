import styles from "./Room.module.scss";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { animationsDetails } from "./animations";
import capacityIcon from "../../assets/images/capacity-icon.svg";

const Room = ({ roomTypes, activeRoomType, setActiveRoomType }) => {
  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  return (
    <section className={styles["section-room"]}>
      <motion.h2
        className={styles["title"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={animationsDetails.appearanceTop}
      >
        Доступні номери
      </motion.h2>
      <div className={styles["room-container"]}>
        {roomTypes.map((room) => (
          <motion.article
            key={room.id}
            className={styles["room"]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={animationsDetails.appearanceLeft}
          >
            <div>
              <img
                src={`${imagesBaseUrl}${room.photo_url}`}
                alt={`Фото кімнати ${room.name}`}
                className={styles["image"]}
              />
            </div>
            <div className={styles["description-container"]}>
              <div className="flex justify-between w-full">
                <div>
                  <header>
                    <h4>{room.name}</h4>
                  </header>
                  <div className="flex items-center gap-2">
                    <span
                      className="flex gap-1"
                      aria-label={`Місткість: ${room.capacity} осіб`}
                    >
                      {Array.from({ length: room.capacity }, (_, index) => (
                        <img key={index} src={capacityIcon} alt="" />
                      ))}
                    </span>
                    <p>{room.capacity} людини</p>
                  </div>
                </div>
                <footer className={styles["button-desktop"]}>
                  <button
                    onClick={() => setActiveRoomType(room.id)}
                    className={
                      activeRoomType === room.id
                        ? styles["active-button"]
                        : styles["inactive-button"]
                    }
                    aria-pressed={activeRoomType === room.id}
                  >
                    {activeRoomType === room.id ? "Обрано" : "Обрати"}
                  </button>
                  <p className={styles["price"]}>
                    {room.price && room.price > 0
                      ? `+ ${room.price} ₴/номер`
                      : "в ціні"}
                  </p>
                </footer>
              </div>
              <div >
                <ul className={styles["room-list"]}>
                  {room.amenities.map((item, index) => (
                    <li key={`amenities-${index + 1}`}>{item}</li>
                  ))}
                </ul>
              </div>
              <footer className={styles["button-mobil"]}>
                <button
                  onClick={() => setActiveRoomType(room.id)}
                  className={
                    activeRoomType === room.id
                      ? styles["active-button"]
                      : styles["inactive-button"]
                  }
                  aria-pressed={activeRoomType === room.id}
                >
                  {activeRoomType === room.id ? "Обрано" : "Обрати"}
                </button>
                <p className={styles["price"]}>
                  {room.price && room.price > 0
                    ? `+ ${room.price} ₴/номер`
                    : "в ціні"}
                </p>
              </footer>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

Room.propTypes = {
  roomTypes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      photo_url: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      capacity: PropTypes.number.isRequired,
      amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  activeRoomType: PropTypes.string,
  setActiveRoomType: PropTypes.func.isRequired,
};

export default Room;
