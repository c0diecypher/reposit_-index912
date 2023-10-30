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
                        <div className="profile-avatar">
                          <img src={userData.photoUrl} className="usercard_avatar_img" />
                        </div>
                      ) : (
                        <div className="profile-avatar">
                          <div  className="profile-avatar-logo">⚡</div>
                        </div>
                      )}
                                  
                    </div>
                    <div className="profile-name">123{user?.first_name}</div>
                  
                </div>
            </div>
        </div>
            <div className="profile-data">
              <div className='profile-data-title'>
                  Телефон не привязан
                  <span>❌</span>
              </div>
                <div className="profile-data-info">
                  <span>Телефон</span>
                  <span className="profile-data-text">+7 ... ... .. ..</span>
                </div>
             </div>
             <div className="profile-data">
              <div className='profile-data-title'>
                    Данные доставки
                </div>
                <div className="profile-data-info">
                  <span>ФИО</span>
                  <span className="profile-data-text">Не указан</span>
                </div>
                <div className="profile-data-info">
                  <span>Телефон</span>
                  <span className="profile-data-text">Не указан</span>
                </div>
                <div className="profile-data-info">
                  <span>Город</span>
                  <span className="profile-data-text">Не указан</span>
                </div>
                <div className="profile-data-info">
                  <span>Пункт выдачи</span>
                  <span className="profile-data-text">Не указан</span>
                </div>
                
                <button className="btn-profile-data-info btn-profile-data">Редактировать</button>
                
                

                
             </div>
    </>
  )
}

export default ProfilePage;
