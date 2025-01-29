import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Базова URL-адреса для зображень
  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Профіль</h1>
      {user ? (
        <div style={styles.profileInfo}>
          <p>
            <strong>Ім'я:</strong> {user.username || "Невідомо"}
          </p>
          <p>
            <strong>Email:</strong> {user.useremail || "Невідомо"}
          </p>
          <p>
            <strong>ID:</strong> {user.id || "Невідомо"}
          </p>
          <img
            src={`${imagesBaseUrl}${user.avatar_url}`}
            alt="Аватар користувача"
            style={styles.avatar}
          />

          <button onClick={handleLogout} style={styles.logoutButton}>
            Вийти
          </button>
        </div>
      ) : (
        <p>Дані користувача недоступні.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  profileInfo: {
    lineHeight: "1.8",
    color: "#555",
    textAlign: "center",
  },
  avatar: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    margin: "20px auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logoutButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#ff4d4d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
