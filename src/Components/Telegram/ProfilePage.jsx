import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect, useState } from 'react';
import CloudStorage from './CloudStorage';
import UserProfile from './UserProfile';

function ProfilePage() {
  const { user } = useTelegram();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
 const [phoneNumber, setPhoneNumber] = useState('');
  const [requestStatus, setRequestStatus] = useState('');

  const requestPhoneNumber = () => {
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
                    <InitialsAvatar
                        className="profile-avatar"
                        userName={user?.first_name}
                        entityId={2}
                        entityName={`${user?.first_name}`}
                        size={100}
                        theme="apple"
                        
        />
                    </div>
             <div className="profile-name">{user?.first_name}</div>
                  <UserProfile />
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
