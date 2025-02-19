import styles from "./SkeletonReviewsHotel.module.scss";

export const SkeletonReviewsHotel = () => {
  const skeletonCards = [
    "skeleton-reviews-1",
    "skeleton-reviews-2",
    "skeleton-reviews-3",
    "skeleton-reviews-4",
    "skeleton-reviews-5",
    "skeleton-reviews-6",
    "skeleton-reviews-7",
    "skeleton-reviews-8",
    "skeleton-reviews-9",
  ];

  return (
    <div className={styles["skeleton-container"]}>
      {skeletonCards.map((cardId) => (
        <article key={cardId} className={styles["skeleton-slide"]}>
          <section className="flex justify-between">
            <div className="flex">
              <div className={styles["number"]}></div>
              <div className={styles["name"]}></div>
            </div>
            <div className={styles["date"]}></div>
          </section>
          <div className={styles["comment"]}></div>
        </article>
      ))}
    </div>
  );
};
