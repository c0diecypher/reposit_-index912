import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile({ userId }) {
  const { tg, user } = useTelegram();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

   
  useEffect(() => {
    if (userId !== undefined && userId !== null) {
      const userIdString = userId.toString(); // Преобразуйте userId в строку

      // Выполняем GET-запрос на сервер для получения информации о пользователе
      fetch(`https://zipperconnect.space/userProfile/${userIdString}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          // Обработка успешного ответа
          setUserData(data);
        })
        .catch((err) => {
          // Обработка ошибки
          setError(err);
        });
    } else {
      // Обработка случая, когда userId не определен
      setError(new Error('userId is undefined or null'));
    }
  }, [userId]);

  return (
    <>
     {userData ? (
        <div className="usercard_avatar">
          <img src={userData.photoUrl} className="usercard_avatar_img" />
        </div>
      ) : (
        <div className="usercard_avatar">
          <div  className="usercard_avatar_logo">⚡</div>
        </div>
          )}
    </>
  );
}

export default UserProfile;
