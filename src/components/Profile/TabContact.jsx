import { useEffect, useState } from "react";
import { getAllContactForms, deleteContactForm } from "@api/contactApi";
import { motion } from "framer-motion";
import { animationsProfile } from "./animations";
import styles from "./Profile.module.scss"

const TabContact = () => {
  const [contacts, setContacts] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const [loadingAll, setLoadingAll] = useState(true);

  const fetchContacts = async () => {
    try {
      const data = await getAllContactForms();
      setContacts(data);
    } catch (err) {
      setError("Не вдалося завантажити контактні форми.", err);
    } finally {
      setLoadingAll(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoadingId(id);
      await deleteContactForm(id);
      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (err) {
      setError("Помилка при видаленні запису.", err);
    } finally {
      setLoadingId(null);
    }
  };

  let content;

  if (loadingAll) {
    content = <p>Завантаження...</p>;
  } else if (contacts.length === 0) {
    content = <p>Немає контактних записів.</p>;
  } else {
    content = (
      <ul className="space-y-3">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="flex justify-between items-center border rounded p-3"
          >
            <div>
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-gray-600">{contact.phone_number}</p>
            </div>
            <button
              onClick={() => handleDelete(contact.id)}
              disabled={loadingId === contact.id}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
            >
              {loadingId === contact.id ? "Видалення..." : "Видалити"}
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={animationsProfile.tab}
    >
      <h2 className={styles["title-manager"]}>Контактні форми</h2>
      {content}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </motion.section>
  );
};

export default TabContact;
