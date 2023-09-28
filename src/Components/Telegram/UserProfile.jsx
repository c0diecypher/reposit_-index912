import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile() {
  const { tg, user } = useTelegram();
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    // Проверяем, доступен ли объект tg.user
    if (tg.user) {
      // Получаем URL фото профиля пользователя
      const photoUrl = tg.user.photo?.small;

      if (photoUrl) {
        setProfilePhoto(photoUrl);
      }
    }
  }, [tg.user]);

  return (
    <div>
      {profilePhoto ? (
        <img src={profilePhoto} alt="user" />
      ) : (
        <InitialsAvatar
          className="usercard_avatar"
          userName={user?.first_name}
          entityId={2}
          entityName={`${user?.first_name}`}
          size={52}
          theme="apple"
          style={{ marginRight: 10 }}
        />
      )}
    </div>
  );
}

export default UserProfile;
