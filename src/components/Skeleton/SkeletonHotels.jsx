import styles from "./SkeletonHotels.module.scss";

export const SkeletonHotels = () => {
  const skeletonCards = ["skeleton-hotel-1", "skeleton-hotel-2"];
  const starIds = ["star-1", "star-2", "star-3", "star-4", "star-5"];
  const amenitiesIds = ["amenities-1", "amenities-2", "amenities-3"];

  return (
    <div className={styles["skeleton-container"]}>
      {skeletonCards.map((cardId) => (
        <article key={cardId} className={styles["skeleton-slide"]}>
          <section className={styles["section-img"]}>
            <div className={styles["img"]}></div>
          </section>
          <section className={styles["section-content"]}>
            <div>
              <div className={styles["county-city"]}></div>
              <div className={styles["name"]}></div>
              <div className={styles["skeleton-stars"]}>
                {starIds.map((starId) => (
                  <div
                    key={`${cardId}-${starId}`}
                    className={styles["skeleton-star"]}
                  ></div>
                ))}
              </div>
              <div className={styles["rating-reviews"]}></div>
            </div>
            <div className={styles["info"]}>
              <div className={styles["skeleton-amenities"]}>
                {amenitiesIds.map((amenitiesId) => (
                  <div
                    key={`${cardId}-${amenitiesId}`}
                    className={styles["skeleton-amenity"]}
                  ></div>
                ))}
              </div>
            </div>
          </section>
        </article>
      ))}
    </div>
  );
};
