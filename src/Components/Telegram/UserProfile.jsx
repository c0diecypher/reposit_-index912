import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css";

function UserProfile({ userId }) {
  const { tg, user } = useTelegram();
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

 useEffect(() => {
    if (userId) {
      fetch(`https://cdn.zipperconnect.space/customer/settings/client/photo/${userId}`)
        .then((response) => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error('Network response was not ok');
          }
        })
        .then((imageBlob) => {
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageUrl);
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
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
    }
  }, [userId]);

  return (
    <>
      {imageSrc ? (
        <div className="usercard_avatar">
          <img src={imageSrc} className="usercard_avatar_img" alt="User Avatar" loading="eager"/>
        </div>
      ) : (
        <div className="usercard_avatar">
          <div className="usercard_avatar_logo">⚡</div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
