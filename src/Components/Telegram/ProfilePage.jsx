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
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(''); // Исходное значение
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );

  const handlePhoneNumberInput = (e) => {
    const inputValue = e.target.value;
    // Удалить все символы, кроме цифр
    const digitsOnly = inputValue.replace(/\D/g, '');

    if (digitsOnly.length >= 11) {
      // Ограничить номер 11 цифрами
      const formattedNumber = `+${digitsOnly.slice(0, 1)}(${digitsOnly.slice(1, 4)})-${digitsOnly.slice(4, 7)}-${digitsOnly.slice(7, 9)}-${digitsOnly.slice(9, 11)}`;
      setPhoneNumber(formattedNumber);
    } else {
      setPhoneNumber(digitsOnly);
    }
  };
   
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
    if (userId) {
    fetch(`https://zipperconnect.space/customer/settings/client/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.userAdress && data.userFio) {
          setPhoneNumber(data.userAdress);
          setFullName(data.userFio);
        } else {
          console.error('Данные не были получены');
        }
      })
      .catch((error) => {
        console.error('Ошибка при запросе данных:', error);
      });
      }
  }, [userId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const sendUserDataToServer = () => {
  console.log('fullName:', fullName);
  console.log('phoneNumber:', phoneNumber);

  if (userId) {
    // Prepare the data for saving
    const newData = {
      userId,
      fullName, // Use the component state directly
      phoneNumber, // Use the component state directly
    };

    // Send the data to the server for updating
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
        // Handle the successful response
        console.log('Data successfully saved', data);
      })
      .catch((err) => {
        // Handle errors
        console.error('Error while saving data:', err);
      });
  }
};

  const handleSaveClick = () => {
    // Вызываем функцию sendUserDataToServer для отправки данных на сервер
    sendUserDataToServer();
  
    // Дополнительные действия после сохранения, если необходимо
    setIsEditing(false);
  };
  
  const [tgPhoneNumber, setTgPhoneNumber] = useState('');
  const [loading, setLoading] = useState(true);
   const requestPhoneNumber = () => {
  setLoading(true); // Устанавливаем состояние loading в true перед выполнением запроса
  window.Telegram.WebApp.requestContact((sent, event) => {
    if (sent) {
      const contact = event && event.responseUnsafe && event.responseUnsafe.contact;
      if (contact && contact.phone_number) {
        setTgPhoneNumber(`+${contact.phone_number}`);
      }
      setLoading(false); // Завершаем состояние loading после успешного запроса
    }
  });
};

  useEffect(() => {
  if (userId) {
    setLoading(true); // Устанавливаем состояние ожидания данных

    fetch(`https://zipperconnect.space/customer/settings/client/get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.userCity) {
          setTgPhoneNumber(data.userCity);
          setLoading(false); // Завершаем ожидание данных и обновляем компонент
        } else {
          console.error('Данные не были получены');
          setLoading(false); // Завершаем ожидание данных, хотя данные не получены
        }
      })
      .catch((error) => {
        console.error('Ошибка при запросе данных:', error);
        setLoading(false); // Завершаем ожидание данных при возникновении ошибки
      });
  }
}, [userId]);
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
                    onChange={handlePhoneNumberInput}/>
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
                    <div className="profile-name">{user?.first_name}</div>
                  
                </div>
            </div> 
        </div>
            <div className="profile-data">
              <div className='profile-data-title'>
                  Телефон {loading ? 'загрузка...' : (tgPhoneNumber ? 'привязан' : 'не привязан')}
              <span style={{ marginLeft: '5px' }}>{loading ? '⌛' : (tgPhoneNumber ? '✅' : '❌')}</span>
              </div>
                <div className="profile-data-info">
                  <span>Телефон</span>
                  <span className="profile-data-text">{loading ? 'Загрузка...' : (tgPhoneNumber || 'Не указан')}</span>
                </div>
                {!loading && !tgPhoneNumber && (
                  <button className="btn-profile-data-info btn-profile-data" onClick={requestPhoneNumber}>
                    Привязать
                  </button>
                )}
             </div>
             <div className="profile-data">
              <div className='profile-data-title'>
                    Данные доставки
                </div>
                <div className="profile-data-info">
                  <span>ФИО</span>
                  <span className="profile-data-text">{fullName || 'Не указан'}</span>
                </div>
                <div className="profile-data-info">
                  <span>Телефон</span>
                  <span className="profile-data-text">{phoneNumber || 'Не указан'}</span>
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
