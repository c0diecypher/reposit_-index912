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
    const userIdValue = userId;
    console.log('id:', userIdValue)
    // Выполняем GET-запрос на сервер для получения информации о пользователе
    fetch(`https://zipperconnect.space/userProfile/${userIdValue}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Обработка успешного ответа
        setUserData(data);
        console.log('Received user data:', data);
      })
      .catch((err) => {
        // Обработка ошибки
        setError(err);
      });
  }, []); // Пустой массив зависимостей, чтобы useEffect выполнился только один раз

  return (
    <div>
      {userData ? (
        <img src={userData.photoUrl} alt="User Photo" />
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
    </div>
  );
}

export default UserProfile;
