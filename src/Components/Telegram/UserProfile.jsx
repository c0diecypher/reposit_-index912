import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css";

function UserProfile({ userId }) {
  const { tg, user } = useTelegram();
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(`https://cdn.zipperconnect.space/customer/settings/client/photo/${userId}`);
        if (response.ok) {
          const imageUrl = `https://cdn.zipperconnect.space/customer/settings/client/photo/${userId}`;

          // Удаление предыдущего URL из Telegram WebApp CloudStorage
          window.Telegram.WebApp.CloudStorage.removeItem("userImage", (err, removed) => {
            if (err) {
              console.error("Error removing previous image URL from CloudStorage", err);
            } else {
              console.log("Previous image URL removed from CloudStorage");
            }
          });

          // Сохранение нового прямого URL изображения в Telegram WebApp CloudStorage
          window.Telegram.WebApp.CloudStorage.setItem("userImage", imageUrl, (err, saved) => {
            if (err) {
              console.error("Error saving image URL to CloudStorage", err);
            } else {
              console.log("Image URL saved to CloudStorage");
            }
          });

          setImageSrc(imageUrl);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (err) {
        setError(err);
      }
    };

    // Извлечение изображения из Telegram WebApp CloudStorage
    window.Telegram.WebApp.CloudStorage.getItems(["userImage"], (err, values) => {
      if (!err && values.userImage) {
        setImageSrc(values.userImage);
        console.log("Image URL retrieved from CloudStorage");
      } else {
        // Если изображение отсутствует в CloudStorage, выполнить запрос к серверу
        fetchImage();
      }
    });
  }, [userId]);

  return (
    <>
      {imageSrc ? (
        <div className="usercard_avatar">
          <img src={imageSrc} className="usercard_avatar_img" alt="User Avatar" loading="eager"/>
        </div>
      ) : (
        <div className="usercard_avatar">
          <div className="usercard_avatar_logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="314" height="251" viewBox="0 0 314 251" fill="none">
              {/* SVG для отображения логотипа, если изображение отсутствует */}
            </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
