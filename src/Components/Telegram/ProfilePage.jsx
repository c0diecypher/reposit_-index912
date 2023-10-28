import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect, useState } from 'react';
import CloudStorage from './CloudStorage';
import UserProfile from './UserProfile';

function ProfilePage({userId}) {
  const { user } = useTelegram();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
 const [phoneNumber, setPhoneNumber] = useState('');
  const [requestStatus, setRequestStatus] = useState('');

  const requestPhoneNumber = ({userId}) => {
    window.Telegram.WebApp.requestContact((sent, event) => {
      if (sent) {
        const contact = event && event.responseUnsafe && event.responseUnsafe.contact;
        if (contact && contact.phone_number) {
          setPhoneNumber(`+${contact.phone_number}`);
          setRequestStatus('Номер успешно привязан ✅');
        }
      } else {
        setRequestStatus('Телефон не привязан ❌');
      }
    });
  };

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
        console.log('Received user data:', data);
      })
      .catch((err) => {
        // Обработка ошибки
        setError(err);
      });
  }, [userId]); // Пустой массив зависимостей, чтобы useEffect выполнился только один раз
 
  useEffect(() => {
    // Выполняем GET-запрос при монтировании компонента
    fetch('https://zipperconnect.space/getPhoneNumber')
      .then((response) => response.json())
      .then((data) => {
        const phoneNumber = data.phoneNumber;
        setPhoneNumber(phoneNumber); // Устанавливаем номер телефона в состояние компонента
      })
      .catch((error) => {
        console.error('Ошибка при получении номера телефона с сервера:', error);
      });
  }, []);

  return (
    <>
        <div className="profile-header">
            <div className="profile-avatar-box">
                <div className="profile-avatar-transparent">
                    <div className="profile-avatar">
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
                                  
                    </div>
             <div className="profile-name">{user?.first_name}</div>
                  
                </div>
            </div>
        </div>
            <div className="profile-data">
                      <h2>Телефон</h2>

        {/* Показываем кнопку только если номер не привязан */}
        {requestStatus !== 'Номер успешно привязан ✅' && (
          <button onClick={requestPhoneNumber}>Отправить номер телефона</button>
        )}
          {phoneNumber ? (
          <p>Номер телефона: {phoneNumber}</p>
        ) : (
          <p>Загрузка номера телефона...</p>
        )}
        
        {requestStatus && (
          <span className={requestStatus === 'Номер успешно привязан ✅' ? 'ok' : 'err'}>
            {`(${requestStatus}${phoneNumber ? `: ${phoneNumber}` : ''})`}
          </span>
        )}
        
      
              <CloudStorage />
                
                    

             </div>
    </>
  )
}

export default ProfilePage;
