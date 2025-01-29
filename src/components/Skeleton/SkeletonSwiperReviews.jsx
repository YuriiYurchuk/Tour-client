import styles from "./SkeletonSwiperReviews.module.scss";

export const SkeletonSwiperReviews = () => {
  const skeletonCards = [
    "skeleton-review-a",
    "skeleton-review-b",
    "skeleton-review-c",
  ];
  const starIds = ["star-1", "star-2", "star-3", "star-4", "star-5"];

  return (
    <div className={styles["skeleton-container"]}>
      {skeletonCards.map((cardId) => (
        <div key={cardId} className={styles["skeleton-slide"]}>
          <div className={styles["skeleton-photo"]}></div>
          <div className={styles["skeleton-stars"]}>
            {starIds.map((starId) => (
              <div
                key={`${cardId}-${starId}`}
                className={styles["skeleton-star"]}
              ></div>
            ))}
          </div>
          <div className={styles["skeleton-line"]}></div>
          <div className={styles["skeleton-line"]}></div>
          <div className={styles["skeleton-comment"]}></div>
        </div>
      ))}
    </div>
  );
};
