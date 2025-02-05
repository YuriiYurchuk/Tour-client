import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHotelDetailsById } from "@api/detailsHotelApi";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import Gallery from "@components/HotelDetails/Gallery";
import Form from "@components/HotelDetails/Form";
import Description from "@components/HotelDetails/Description";
import Room from "@components/HotelDetails/Room";
import Rating from "@components/HotelDetails/Rating";
import Features from "@components/HotelDetails/Features";
import Food from "@components/HotelDetails/Food";
import styles from "./HotelDetails.module.scss";
import ErrorMessage from "@components/ErrorMessage/ErrorMessage";
import { motion } from "framer-motion";
import { animationsDetails } from "../../components/HotelDetails/animations";
import star from "../../assets/images/filled-star-icon.svg";

const HotelDetails = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMealType, setActiveMealType] = useState(null);
  const [activeRoomType, setActiveRoomType] = useState(null);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const data = await getHotelDetailsById(id);
        setHotel(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [id]);

  console.log(hotel);

  const mapDescriptions = (array) =>
    Array.isArray(array) ? array.map((item) => item.description).flat() : [];
  const calculateAverage = (value) => (value ? Math.round(value * 10) / 10 : 0);

  if (loading)
    return (
      <div className={styles["loader"]}>
        <div className={styles["spinner"]}></div>
      </div>
    );
  if (error)
    return (
      <section className={`container ${styles["container-details"]}`}>
        <ErrorMessage />
      </section>
    );

  return (
    <>
      <Breadcrumbs />
      <section className={`container ${styles["container-details"]}`}>
        <div className="">
          <div className={styles["description-form"]}>
            <div className={styles["gallery-container"]}>
              <Gallery hotelGallery={hotel.gallery} />
            </div>
            <div className={styles["form-container1"]}>
              <div className={styles["description-mobile"]}>
                <motion.p
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                >
                  {hotel.country}, {hotel.city}
                </motion.p>
                <motion.h4
                  className={styles["hotel-name"]}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                >
                  {hotel.name}
                </motion.h4>
                <div className="flex gap-3 items-center mb-7">
                  <motion.div
                    className={styles["star-rating"]}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={animationsDetails.appearanceTop}
                  >
                    {Array.from({ length: hotel.star_rating }, (_, index) => (
                      <img key={`star-${index + 1}`} src={star} alt="Star" />
                    ))}
                  </motion.div>
                  <motion.p
                    className={styles["review-info"]}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={animationsDetails.appearanceTop}
                  >
                    <span className={styles["rating"]}>
                      {calculateAverage(hotel.average_rating) ?? 0}
                    </span>{" "}
                    {hotel.review_count} відгуків
                  </motion.p>
                </div>
                <motion.p
                  className={styles["price-text"]}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={animationsDetails.appearanceLeft}
                >
                  <span className={styles["price-amount"]}>
                    {hotel.tour_price} ₴
                  </span>{" "}
                  / за 1 людину
                </motion.p>
              </div>
              <Form
                price={hotel.tour_price}
                mealTypes={hotel.meal_types}
                roomTypes={hotel.room_types}
                activeMealType={activeMealType}
                setActiveMealType={setActiveMealType}
                activeRoomType={activeRoomType}
                setActiveRoomType={setActiveRoomType}
                country={hotel.country}
                city={hotel.city}
                id={hotel.id}
              />
            </div>
          </div>
          <section className={styles["content-container"]}>
            <Description
              country={hotel.country}
              city={hotel.city}
              name={hotel.name}
              starRating={hotel.star_rating}
              averageRating={calculateAverage(hotel.average_rating)}
              reviewCount={hotel.review_count}
              tourPrice={hotel.tour_price}
              description={hotel.description}
              amenities={
                Array.isArray(hotel.amenities)
                  ? hotel.amenities.map((item) => item.description).flat()
                  : []
              }
            />
            <Room
              roomTypes={hotel.room_types}
              activeRoomType={activeRoomType}
              setActiveRoomType={setActiveRoomType}
            />
            <Rating
              averageRating={calculateAverage(hotel.average_rating)}
              reviewCount={hotel.review_count}
              animation={calculateAverage(hotel.rating?.animation_avg)}
              beach={calculateAverage(hotel.rating?.beach_avg)}
              food={calculateAverage(hotel.rating?.food_avg)}
              price={calculateAverage(hotel.rating?.price_avg)}
              room={calculateAverage(hotel.rating?.room_avg)}
              staff={calculateAverage(hotel.rating?.staff_avg)}
              reviews={hotel.reviews}
              hotelId={hotel.id}
            />
            <Features
              surroundings={mapDescriptions(hotel.surroundings)}
              communication={mapDescriptions(hotel.communication)}
              airportDistance={mapDescriptions(hotel.airport)}
              latitude={hotel.location.latitude}
              longitude={hotel.location.longitude}
              beach={mapDescriptions(hotel.beach)}
              general={mapDescriptions(hotel.general)}
              activities={mapDescriptions(hotel.activities)}
              pools={mapDescriptions(hotel.pools)}
              spa={mapDescriptions(hotel.spas)}
              service={mapDescriptions(hotel.services)}
              contact={mapDescriptions(hotel.contact)}
              kids={mapDescriptions(hotel.kids)}
            />
            <Food
              restaurants={hotel.restaurants
                .map((restaurant) => restaurant.description)
                .flat()}
              mealTypes={hotel.meal_types}
              activeMealType={activeMealType}
              setActiveMealType={setActiveMealType}
            />
          </section>
        </div>
        <div className={styles["form-container"]}>
          <div className={styles["description-mobile"]}>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceLeft}
            >
              {hotel.country}, {hotel.city}
            </motion.p>
            <motion.h4
              className={styles["hotel-name"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceLeft}
            >
              {hotel.name}
            </motion.h4>
            <div className="flex gap-3 items-center mb-7">
              <motion.div
                className={styles["star-rating"]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceTop}
              >
                {Array.from({ length: hotel.star_rating }, (_, index) => (
                  <img key={`star-${index + 1}`} src={star} alt="Star" />
                ))}
              </motion.div>
              <motion.p
                className={styles["review-info"]}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={animationsDetails.appearanceTop}
              >
                <span className={styles["rating"]}>
                  {calculateAverage(hotel.average_rating) ?? 0}
                </span>{" "}
                {hotel.review_count} відгуків
              </motion.p>
            </div>
            <motion.p
              className={styles["price-text"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={animationsDetails.appearanceLeft}
            >
              <span className={styles["price-amount"]}>
                {hotel.tour_price} ₴
              </span>{" "}
              / за 1 людину
            </motion.p>
          </div>
          <Form
            price={hotel.tour_price}
            mealTypes={hotel.meal_types}
            roomTypes={hotel.room_types}
            activeMealType={activeMealType}
            setActiveMealType={setActiveMealType}
            activeRoomType={activeRoomType}
            setActiveRoomType={setActiveRoomType}
            country={hotel.country}
            city={hotel.city}
            id={hotel.id}
          />
        </div>
      </section>
    </>
  );
};

export default HotelDetails;
