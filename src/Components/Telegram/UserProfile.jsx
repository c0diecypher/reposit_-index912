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
          const imageBlob = await response.blob();
          const imageUrl = URL.createObjectURL(imageBlob);
          setImageSrc(imageUrl);

          // Сохранение URL изображения в Telegram WebApp CloudStorage
         window.Telegram.WebApp.CloudStorage.setItem("userImage", imageUrl, { ttl: -1 }, (err, saved) => {
            if (err) {
              console.error("Error saving image to CloudStorage", err);
            } else {
              console.log("Image saved to CloudStorage");
            }
          });
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
        console.log("Image retrieved from CloudStorage");
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
            <path fillRule="evenodd" clipRule="evenodd" d="M34.25 34.0459C3.311 64.7629 0 68.3619 0 71.2859C0 74.1889 2.748 77.2589 26.75 101.159C51.595 125.9 56.173 130.008 58.899 130.008C59.466 130.008 61.521 128.611 63.465 126.904L67 123.801L67.032 185.654C67.057 235.502 67.321 247.848 68.392 249.258C69.639 250.901 75.047 251.008 156.95 251.008H244.179L246.056 248.758C247.846 246.612 247.935 243.685 247.967 185.584L248 124.659L250.25 126.76C251.488 127.915 253.774 129.176 255.33 129.562C257.994 130.224 259.801 128.628 286.08 102.41C311.466 77.0839 314 74.2539 314 71.2279C314 68.1839 311.083 65.0059 279.785 33.9539L245.569 0.00789157H217.32C185.74 0.00789157 187.995 -0.538101 186.55 7.4529C185.573 12.8509 181.754 20.0999 177.806 24.0479C170.838 31.0159 158.373 33.7119 147.601 30.5799C137.855 27.7469 129.476 18.1139 127.548 7.5259C126.08 -0.532103 128.293 0.00588986 96.715 0.0248899L68.5 0.0418882L34.25 34.0459Z" style={{fill: 'var(--tg-text)'}}/>
          </svg>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
