import styles from "./SkeletonSwiperHot.module.scss";

export const SkeletonSwiperHot = () => {
  const skeletonSlides = ["slide1", "slide2", "slide3", "slide4", "slide5"];

  return (
    <div className={styles["skeleton-container"]}>
      {skeletonSlides.map((slideId) => (
        <div key={slideId} className={styles["skeleton-slide"]}>
          <div className={styles["skeleton-image"]}></div>
          <div className={styles["skeleton-info"]}>
            <div className={styles["skeleton-price"]}></div>
            <div className={styles["skeleton-location"]}></div>
            <div className={styles["skeleton-date"]}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
