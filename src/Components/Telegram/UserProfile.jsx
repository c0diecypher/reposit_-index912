import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile() {
   const [photos, setPhotos] = useState([]); // Состояние для хранения списка фотографий
   const { user } = useTelegram();
   
  useEffect(() => {
    // Выполняем GET-запрос к бэкенду для получения списка фотографий
    fetch('https://zipperconnect.space/getProfilePhoto')
      .then((response) => response.json())
      .then((data) => {
        const photoUrl = data.photo_url;
        setProfilePhoto(photoUrl); 
      })
      .catch((error) => {
        console.error('Ошибка при получении фотографий с сервера:', error);
      });
  }, []);

  return (
    <div>
 
      
          
            {profilePhoto && <img src={profilePhoto} alt="photo" />}
             <img src={user?.photo_url} alt="photo" />
         
 

    </div>
  );
}

export default UserProfile;
