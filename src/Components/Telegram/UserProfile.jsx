import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile() {
   const [photos, setPhotos] = useState([]); // Состояние для хранения списка фотографий

  useEffect(() => {
    // Выполняем GET-запрос к бэкенду для получения списка фотографий
    fetch('https://zipperconnect.space/getProfilePhoto')
      .then((response) => response.json())
      .then((data) => {
        // data.photos содержит список фотографий из вашего бэкенда
        setPhotos(data.photos);
      })
      .catch((error) => {
        console.error('Ошибка при получении фотографий с сервера:', error);
      });
  }, []);

  return (
    <div>
 
      
          
            <img src={photos} alt='фото профиля' />
         
 

    </div>
  );
}

export default UserProfile;
