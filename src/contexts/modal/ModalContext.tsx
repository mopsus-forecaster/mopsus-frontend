import { createContext } from 'react';
import useModal from '../../hooks/useModal';
import Modal from '../../shared/modal';

export const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const { openModal, handleClose, handleOpen, modal, handleModalChange } =
    useModal();
  return (
    <ModalContext.Provider
      value={{ handleOpen, handleClose, openModal, handleModalChange }}
    >
      <Modal
        title={modal.title}
        icon={modal.icon}
        show={openModal}
        message={modal.message}
        accept={{ title: modal.accept.title, action: modal.accept.action }}
        reject={{ title: modal.reject?.title, action: modal.reject?.action }}
        handleClose={handleClose}
      />
      {children}
    </ModalContext.Provider>
  );
};
