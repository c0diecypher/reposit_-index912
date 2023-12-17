import { BackButton } from "@twa-dev/sdk/react"; 

const CustomBackButton = ({ closeConfirm, ...props }) => {
  const handleClick = () => {
    console.log('Нажата кнопка назад!');
    closeConfirm();  
    console.log('Нажата closeConfirm', closeConfirm);
    props.onClick && props.onClick();
  };

  return <BackButton {...props} onClick={handleClick} />;
};

export default CustomBackButton;
