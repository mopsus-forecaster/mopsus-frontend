import { useState } from "react";
import { IconifyIcon } from "@iconify/react/dist/iconify.js";

type Modal = {
  title: string;
  accept: {
    title: string;
    action: () => void;
  };
  reject?: {
    title: string;
    action: () => void;
  };
  message: string;
  icon?: IconifyIcon;
};

const useModal = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modal, setModal] = useState<Modal>({
    title: "",
    accept: {
      title: "",
      action: () => {},
    },
    message: "",
  });

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleModalChange = (newModalProperties: Modal) => {
    setModal(() => ({ ...newModalProperties }));
  };

  return {
    openModal,
    handleClose,
    handleOpen,
    handleModalChange,
    modal,
    setOpenModal,
  };
};

export default useModal;
