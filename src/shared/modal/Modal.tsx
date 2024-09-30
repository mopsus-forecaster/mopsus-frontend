import { Icon, IconifyIcon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef } from "react";
import styles from "./styles/modal.module.scss";

type ModalProps = {
  show: boolean;
  title: string;
  accept: {
    title: string;
    action: () => void;
  };
  reject?: {
    title: string;
    action: () => void;
  };
  icon?: IconifyIcon;
  handleClose: () => void;
  message: string;
};

const Modal: React.FC<ModalProps> = ({
  show,
  title,
  accept,
  icon,
  handleClose,
  reject,
  message,
}) => {
  const acceptButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      acceptButtonRef.current?.focus();
      if (event.key === "Enter") {
        accept.action();
        handleClose();
      } else if (event.key === "Escape") {
        if (reject && reject.action) {
          event.preventDefault();
          reject.action();
        }

        handleClose();
      }
    };

    if (show) {
      document.addEventListener("keydown", handleKeyDown);
      if (acceptButtonRef.current) {
        acceptButtonRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, accept, reject, handleClose]);

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };
  return (
    <>
      {show && (
        <div className={styles.background} onClick={handleBackgroundClick}>
          <div
            className={icon ? styles.modal : styles.modalNoIcon}
            onClick={(e) => e.stopPropagation()}
          >
            <header className={icon ? styles.header : styles.headerNoIcon}>
              {icon && <Icon className={styles.icon} icon={icon} />}
              <h1 className={icon ? styles.title : styles.titleNoIcon}>
                {title}
              </h1>
            </header>
            <p className={styles.message}>{message}</p>
            <footer
              className={reject?.action ? styles.footerFlex : styles.footer}
            >
              {reject?.title !== undefined && (
                <button
                  className={styles.reject}
                  onClick={() => {
                    reject.action();
                    handleClose();
                  }}
                >
                  {reject.title}
                </button>
              )}
              <button
                ref={acceptButtonRef}
                className={
                  reject ? styles.confirmButtonFlex : styles.confirmButton
                }
                onClick={() => {
                  accept.action();
                  handleClose();
                }}
              >
                {accept.title}
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
