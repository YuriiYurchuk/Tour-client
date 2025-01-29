import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const AnimatedOrders = ({ totalOrders, animationDuration = 2000 }) => {
  const [displayedOrders, setDisplayedOrders] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) return;

    const increment = totalOrders / (animationDuration / 20);
    let counter = 0;

    const interval = setInterval(() => {
      if (counter < totalOrders) {
        counter += increment;
        setDisplayedOrders(Math.min(Math.round(counter), totalOrders));
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [hasAnimated, totalOrders, animationDuration]);

  const handleAnimation = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={handleAnimation}
    >
      {displayedOrders}
    </motion.span>
  );
};

AnimatedOrders.propTypes = {
  totalOrders: PropTypes.number.isRequired,
  animationDuration: PropTypes.number,
};

export default AnimatedOrders;
