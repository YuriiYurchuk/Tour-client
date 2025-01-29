export const animationsAboutUs = {
  articleTop: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  articleBottom: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  textTop: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  textBottom: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  imageTop: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
  imageBottom: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    transition: { duration: 1.5, ease: "easeInOut" },
  },
};
