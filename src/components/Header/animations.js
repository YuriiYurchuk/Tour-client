export const animationsHeader = {
  header: {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  },
  logo: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { delay: 0.5, duration: 0.5 },
  },
  navLink: (index) => ({
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.3,
        duration: 0.5,
      },
    },
  }),
  button: (index) => ({
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: index * 0.9, duration: 0.8 },
  }),
  buttonAuth: {
    initial: { opacity: 0, scale: 0.1 },
    animate: { opacity: 1, scale: 1 },
    transition: { delay: 1.2, duration: 0.8 },
  },
};
