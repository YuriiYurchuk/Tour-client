import { useState, useEffect } from "react";
import styles from "./Maps.module.scss";
import { getAllHotelsWithStreaming } from "@api/getHotelApi";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import HotelCard from "@components/Card/HotelCard";
import "leaflet/dist/leaflet.css";
import Modal from "@components/UI/Modal/Modal";
import L from "leaflet";

const Maps = () => {
  const [hotels, setHotels] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const imagesBaseUrl = import.meta.env.VITE_IMAGES_BASE_URL;

  useEffect(() => {
    const onHotelReceived = (hotel) => {
      setHotels((prevHotels) => [...prevHotels, hotel]);
    };

    const onCompleted = () => {
      setIsCompleted(true);
    };

    const eventSource = getAllHotelsWithStreaming(onHotelReceived, onCompleted);

    return () => {
      eventSource.close();
    };
  }, []);

  const createCustomIcon = (price) => {
    return new L.DivIcon({
      className: styles["custom-marker"],
      html: `<div class="${styles.markerContent}">${price}</div>`,
      iconSize: [60, 25],
      iconAnchor: [0, 0],
    });
  };

  const getHotelCorrectWord = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) {
      return "готель";
    } else if (
      [2, 3, 4].includes(count % 10) &&
      ![12, 13, 14].includes(count % 100)
    ) {
      return "готелі";
    } else {
      return "готелів";
    }
  };

  return (
    <div className={styles["wrapper-maps"]}>
      {isCompleted && (
        <div className={styles["completed"]}>
          <p>
            Показано {hotels.length} {getHotelCorrectWord(hotels.length)}
          </p>
        </div>
      )}
      <MapContainer
        center={[50.4501, 30.5244]}
        zoom={5}
        minZoom={3}
        maxZoom={18}
        style={{ height: "90vh", width: "100%" }}
      >
        <TileLayer
          noWrap={true}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hotels.map((hotel) => (
          <Marker
            key={hotel.location.id}
            position={[hotel.location.latitude, hotel.location.longitude]}
            icon={createCustomIcon(`${hotel.tour_price} ₴`)}
            eventHandlers={{
              click: () => {
                setSelectedHotel(hotel);
                setIsLocationOpen(true);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      <Modal
        modalClassName={styles["modal-maps"]}
        contentClassName={styles["content-maps"]}
        isOpen={isLocationOpen}
        onClose={() => setIsLocationOpen(false)}
      >
        {selectedHotel && (
          <HotelCard
            id={selectedHotel.id}
            name={selectedHotel.name}
            city={selectedHotel.city}
            country={selectedHotel.country}
            starRating={selectedHotel.star_rating || 0}
            averageRating={
              selectedHotel.average_rating
                ? Math.round(selectedHotel.average_rating * 10) / 10
                : 0
            }
            reviewCount={selectedHotel.review_count || 0}
            isHotDeal={selectedHotel.is_hot_deal}
            tourPrice={Number(selectedHotel.tour_price)}
            tourStartDate={selectedHotel.tour_start_date}
            tourEndDate={selectedHotel.tour_end_date}
            includedMealTypes={selectedHotel.included_meal_types}
            season={selectedHotel.season}
            amenities={selectedHotel.amenity || []}
            hotelPhoto={`${imagesBaseUrl}${selectedHotel.hotel_photos}`}
          />
        )}
      </Modal>
    </div>
  );
};

export default Maps;
