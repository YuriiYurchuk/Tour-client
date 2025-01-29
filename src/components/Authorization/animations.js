export const animationsLoginRegister = {
  page: {
    initial: { opacity: 0, scale: 0.1 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1 },
  },
  title: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 2 },
  },
  form: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 3 },
  },
  buttons: {
    initial: { y: 100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 2 },
  },
};

export const animationsAuthContent = {
  aside: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  header: {
    initial: { opacity: 0, y: -30 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, duration: 0.6 },
  },
  logo: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay: 0.4, duration: 0.5 },
  },
  content: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.6, duration: 0.7 },
  },
  nav: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.8, duration: 0.6 },
  },
};
