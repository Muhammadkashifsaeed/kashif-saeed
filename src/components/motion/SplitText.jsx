'use client';
import { motion } from 'framer-motion';

export default function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  mode = 'chars', // 'chars' | 'words'
  immediate = false,
}) {
  const tokens = mode === 'words' ? text.split(' ') : Array.from(text);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: { y: '110%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const motionProps = immediate
    ? { initial: 'hidden', animate: 'visible' }
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.3 },
      };

  return (
    <motion.span
      variants={containerVariants}
      {...motionProps}
      className={`inline-flex flex-wrap ${className}`}
      aria-label={text}
    >
      {tokens.map((token, idx) => (
        <span
          key={`${token}-${idx}`}
          className="inline-block overflow-hidden align-top"
          aria-hidden="true"
        >
          <motion.span variants={itemVariants} className="inline-block">
            {token === ' ' ? '\u00A0' : token}
            {mode === 'words' && idx < tokens.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

