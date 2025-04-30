import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 애니메이션 효과 정의
const pageEffect = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 2,
  },
  out: {
    opacity: 0,
  },
};

const Wrapper = ({ children, ...rest }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        transition={{ duration: 1 }}
        variants={pageEffect}  // 애니메이션 효과 적용
        {...rest}  // 나머지 props (key 등)
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Wrapper;
