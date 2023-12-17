import { BackButton } from "@twa-dev/sdk/react"; 

const HomeBackButton = ({ closeModal, ...props }) => {
  function handleClick() {
    closeModal();  
    console.log('Нажата closeModal', closeModal);
    props.onClick && props.onClick();
  };

  return <BackButton {...props} onClick={handleClick} />;
};

export default HomeBackButton;
