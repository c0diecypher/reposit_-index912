import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile({ userId }) {
  const { tg, user } = useTelegram();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

   
  useEffect(() => {
    // Замените 'userId' на фактический ID пользователя, информацию о котором вы хотите получить
    // Выполняем GET-запрос на сервер для получения информации о пользователе
    fetch(`https://zipperconnect.space/userProfile/${userId}`)
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
  }, [userId]);

  return (
    <>
      {userData ? (
        <div className="usercard_avatar">
          <img src={userData.photoUrl} alt="User Photo" className="usercard_avatar_img" />
        </div>
      ) : (
        <InitialsAvatar
          className="usercard_avatar"
          userName={user?.first_name}
          entityId={2}
          entityName={`${user?.first_name}`}
          size={42}
          theme="apple"
          style={{ marginRight: 10 }}
        />
      )}
    </>
  );
}

export default UserProfile;
