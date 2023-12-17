import { BackButton } from "@twa-dev/sdk/react"; 

const CustomBackButton = ({ closeConfirm, onClick, ...props }) => {
  const handleClick = () => {
    console.log('Нажата кнопка назад!');
    closeConfirm();  
    console.log('Нажата closeConfirm', closeConfirm);
    onClick && onClick();
  };

  return <BackButton {...props} onClick={handleClick} />;
};

export default CustomBackButton;
