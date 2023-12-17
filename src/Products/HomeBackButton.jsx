import { BackButton } from "@twa-dev/sdk/react"; 

const HomeBackButton = ({ closeModal, ...props }) => {
  function handleClick() {
    console.log('Нажата кнопка назад!');
    closeModal();  
    console.log('Нажата closeModal', closeConfirm);
    props.onClick && props.onClick();
  };

  return <BackButton {...props} onClick={handleClick} />;
};

export default HomeBackButton;
