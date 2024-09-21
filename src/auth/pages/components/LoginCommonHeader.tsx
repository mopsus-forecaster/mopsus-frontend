import React from 'react';
import styles from '../../styles/auth.module.scss';
import { LoginCommonHeaderProps } from '../../../types';
export const LoginCommonHeader: React.FC<LoginCommonHeaderProps> = ({
  title,
}) => {
  return (
    <>
      <div className={styles.logo}></div>
      <h4>{title}</h4>
    </>
  );
};
