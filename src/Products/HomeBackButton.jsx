import { BackButton } from "@twa-dev/sdk/react"; 

const HomeBackButton = ({ closeModal, ...props }) => {
  const handleClose = () => {
    closeModal();  
    console.log('Нажата closeModal', closeModal);
    props.onClick && props.onClick();
  };

  return <BackButton {...props} onClick={handleClose} />;
};

export default HomeBackButton;
