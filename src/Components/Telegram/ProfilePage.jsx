import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect, useState } from 'react';
import CloudStorage from './CloudStorage';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import { MainButton } from "@twa-dev/sdk/react"


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
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
   
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

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(''); // Исходное значение
 
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Сохранение данных в базу данных
    const newData = {
      userId,
      fullName,
      phoneNumber,
    };

    useEffect(() => {
  if (userData && userId) {
    // Подготовьте данные для сохранения (например, создайте объект newData)
    const newData = {
      userId,
      fullName: userData.fullName, // Здесь должен быть фактический путь к данным в userData
      phoneNumber: userData.phoneNumber, // Здесь должен быть фактический путь к данным в userData
    };

    // Отправьте данные на сервер для обновления
    fetch('https://zipperconnect.space/customer/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Обработка успешного ответа
        // Возможно, обновление состояния или другие действия
        console.log('Данные успешно сохранены', data);
      })
      .catch((err) => {
        // Обработка ошибки
        console.error('Ошибка при сохранении данных:', err);
      });
  }
}, [userData, userId]);

 return (
    <>
     {isEditing ? (
      <>
            <div className="profile-data">
              <div className='profile-data-title'>
                  Данные доставки
              </div>
                <div className="profile-data-info">
                  <h2>Данные получателя</h2>
                </div>
                <div className="profile-select-info">
                
                  <div className="profile-select-input">
                    <label className="profile-select-label">Фамилия, имя и очетство</label>
                    <input type="text" className="profile-search-value"  value={fullName}
                      onChange={(e) => setFullName(e.target.value)}/>
                    <div className="profile-select-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-chevron-right">
                        <path d="M9 6l6 6l-6 6"></path>
                      </svg>
                      </div>
                  </div>
                  <div className="profile-select-input">
                    <label className="profile-select-label">Телефон</label>
                    <input type="text" className="profile-search-value" value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}/>
                    <div className="profile-select-info-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-chevron-right">
                        <path d="M9 6l6 6l-6 6"></path>
                      </svg>
                      </div>
                  </div>
                </div>
            </div>
        <MainButton 
            onClick={handleSaveClick}
            color={color}
            textColor={textColor}
            text={`Сохранить`}
                        />
        </>
      ) : (
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

                <button className="btn-profile-data-info btn-profile-data" onClick={handleEditClick}>
                Редактировать</button>             
             </div>
             </>
             )}
    </>
  )
 }

export default ProfilePage;
