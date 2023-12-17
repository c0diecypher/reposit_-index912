import React from 'react';
import { BackButton } from "@twa-dev/sdk/react"; 

const CustomBackButton = (props) => {
  const handleClick = () => {
    console.log('Нажата кнопка назад!');
    // Добавьте здесь дополнительные действия по необходимости
    // Например, вызов функции closeConfirm
    props.onClick && props.onClick();
  };

  return <BackButton {...props} onClick={handleClick} />;
};

export default CustomBackButton;
