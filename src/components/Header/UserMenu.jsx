import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Header";

const UserMenu = ({ username, avatar_url }) => {
  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="username-link flex items-center gap-2"
      >
        <Link to="/profile" className="flex items-center gap-2">
          {username}
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={`${imagesBaseUrl}${avatar_url}` || "/default-avatar.png"}
              alt={`${username} avatar`}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

UserMenu.propTypes = {
  username: PropTypes.string.isRequired,
  avatar_url: PropTypes.string,
};

export default UserMenu;
