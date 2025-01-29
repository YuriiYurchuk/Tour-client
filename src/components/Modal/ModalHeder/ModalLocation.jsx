import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Modal from "@components/UI/Modal/Modal";
import styles from "./ModalLocation.module.scss";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../../../assets/images/maps-marker.svg";

const ModalMap = ({ isOpen, onClose, coordinates }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      if (!mapRef.current) {
        mapRef.current = L.map("map").setView(coordinates, 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);

        const customIcon = L.icon({
          iconUrl: markerIcon,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });

        L.marker(coordinates, { icon: customIcon })
          .addTo(mapRef.current)
          .bindPopup("Наше місце знаходження");
      } else {
        mapRef.current.setView(coordinates, 13);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOpen, coordinates]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles["modal-map__container"]}>
        <h2 className={styles["map-title"]}>Київ, Хрещатик 22</h2>
        <div id="map" className={styles["map"]}></div>
      </div>
    </Modal>
  );
};

ModalMap.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ModalMap;
