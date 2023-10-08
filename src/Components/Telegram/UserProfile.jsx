import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile() {
  const { tg, user } = useTelegram();
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    fetch('https://zipperconnect.space/getPhotoFile')
  .then((response) => response.json())
  .then((data) => {
    const photoFile = data.photoFile;

    // Найдите элемент <img> в вашем HTML-документе по его id
    const imgElement = document.getElementById('profileImage');

    // Установите src атрибут тега <img> для отображения изображения
    imgElement.src = photoFile;
  })
  .catch((error) => {
    console.error('Ошибка при получении photoFile с сервера:', error);
  });
  }, []);

  return (
    <div>
      <img id="profileImage" src={photoFile} alt="profilepage" />
    </div>
  );
}

export default UserProfile;
