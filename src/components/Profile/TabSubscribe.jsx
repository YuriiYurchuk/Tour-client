import { useState, useEffect } from "react";
import { getAllSubscribers, deleteSubscriber } from "@api/emailSubscriberApi";
import { motion } from "framer-motion";
import { animationsProfile } from "./animations";
import styles from "./Profile.module.scss";

const TabSubscribe = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const data = await getAllSubscribers();
        setSubscribers(data);
        setLoading(false);
      } catch (err) {
        setError("Не вдалося завантажити підписників.", err);
        setLoading(false);
      }
    };

    fetchSubscribers();
  }, []);

  const handleDelete = async (email) => {
    try {
      setDeleting(email);
      await deleteSubscriber(email);
      setSubscribers(
        subscribers.filter((subscriber) => subscriber.email !== email)
      );
      setDeleting(null);
    } catch (err) {
      setError("Не вдалося видалити підписника.", err);
      setDeleting(null);
    }
  };

  let content;
  if (loading) {
    content = <p className="text-center text-gray-500 py-4">Завантаження...</p>;
  } else if (error) {
    content = <p className="text-center text-red-500 py-4">{error}</p>;
  } else {
    content = (
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Email
            </th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
              Дії
            </th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr key={subscriber.email} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-900">
                {subscriber.email}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                <button
                  onClick={() => handleDelete(subscriber.email)}
                  disabled={deleting === subscriber.email}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
                >
                  {deleting === subscriber.email ? "Видалення..." : "Видалити"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={animationsProfile.tab}
    >
      <h2 className={styles["title-manager"]}>Управління підписниками</h2>
      {content}
    </motion.section>
  );
};

export default TabSubscribe;
