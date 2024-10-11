import React from 'react';
import styles from './styles/box.module.scss';

interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
  return <div className={styles.box}>{children}</div>;
};

export default Box;
