import { useEffect } from "react";
import styles from "./Contacts.module.scss";
import OurContacts from "./OurContacts";
import { motion } from "framer-motion";
import markerIcon from "../../assets/images/maps-marker.svg";
import L from "leaflet";

const ContactsComponents = () => {
  useEffect(() => {
    const map = L.map("map").setView(
      [50.45000033853365, 30.523172265526192],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const customIcon = new L.Icon({
      iconUrl: markerIcon,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const marker = L.marker([50.4501, 30.5234], { icon: customIcon }).addTo(
      map
    );

    marker.bindPopup("Київ, Хрещатик будинок 22, (2 поверх)");

    return () => {
      map.remove();
    };
  }, []);

  return (
    <section className="container">
      <motion.header
        className={styles["contact-title"]}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <h2>Зв'яжіться з нами</h2>
      </motion.header>
      <OurContacts />
      <motion.div
        className={styles["map-container"]}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <div id="map" style={{ height: "370px", width: "100%" }}></div>{" "}
      </motion.div>
    </section>
  );
};

export default ContactsComponents;
