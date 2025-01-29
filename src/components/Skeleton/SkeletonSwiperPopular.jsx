import styles from "./SkeletonSwiperPopular.module.scss";

export const SkeletonSwiperPopular = () => {
  const skeletonSlides = ["slide1", "slide2", "slide3", "slide4"];

  return (
    <div className={styles["skeleton-container"]}>
      {skeletonSlides.map((slideId) => (
        <div key={slideId} className={styles["skeleton-slide"]}>
          <div className={styles["skeleton-image"]}></div>
        </div>
      ))}
    </div>
  );
};
