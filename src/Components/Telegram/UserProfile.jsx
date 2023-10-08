import { useEffect, useState } from "react";
import "../../css/body.css"

function UserProfile() {
  const [profilePhoto, setProfilePhoto] = useState(""); // Используйте правильное имя переменной

  useEffect(() => {
    // Выполняем GET-запрос к "https://zipperconnect.space/getProfilePhoto"
    fetch('https://zipperconnect.space/getProfilePhoto')
      .then((response) => response.blob()) // Получаем бинарные данные изображения
      .then((data) => {
        // Создаем объект URL для бинарных данных и устанавливаем его как источник изображения
        const imageUrl = URL.createObjectURL(data);
        setProfilePhoto(imageUrl); // Используйте правильное имя переменной
      })
      .catch((error) => {
        console.error('Ошибка при получении изображения профиля:', error);
      });
  }, []);

  return (
    <div>
      {profilePhoto && <img src={profilePhoto} alt="Изображение профиля" />}
    </div>
  );
}

export default UserProfile;
