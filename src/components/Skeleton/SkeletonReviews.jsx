import styles from "./SkeletonReviews.module.scss";

export const SkeletonReviews = () => {
  const skeletonCards = [
    "skeleton-review-1",
    "skeleton-review-2",
    "skeleton-review-3",
    "skeleton-review-4",
    "skeleton-review-5",
    "skeleton-review-6",
    "skeleton-review-7",
    "skeleton-review-8",
    "skeleton-review-9",
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
