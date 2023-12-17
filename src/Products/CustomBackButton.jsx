import { BackButton } from "@twa-dev/sdk/react";

const CustomBackButton = ({ closeConfirm, closeModal, onClick, ...props }) => {
  const handleClick = () => {
    console.log('Нажата кнопка назад!');
    if (closeConfirm) {
      closeConfirm();
      console.log('Нажата closeConfirm', closeConfirm);
    } else if (closeModal) {
      closeModal();
      console.log('Нажата closeModal', closeModal);
    }
  };

  return <BackButton onClick={handleClick} {...props} />;
};

export default CustomBackButton;
