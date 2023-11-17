import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect, useState } from 'react';
import CloudStorage from './CloudStorage';
import UserProfile from './UserProfile';
import { Link } from 'react-router-dom';
import { MainButton } from "@twa-dev/sdk/react"
import axios from 'axios';

function ProfilePage({userId}) {
  const { user } = useTelegram();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(''); // Исходное значение
  const [userPhone, setUserPhone] = useState('');
  const [imageSrc, setImageSrc] = useState(null);
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
      setUserPhone(formattedNumber);
    } else {
      setUserPhone(digitsOnly);
    }
  };

  useEffect(() => {
    if (userId) {
      fetch(`https://cdn.zipperconnect.space/userProfile/${userId}`)
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
    fetch(`https://crm.zipperconnect.space/customer/settings/client/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.phoneNumber && data.userFio && data.userAdress && data.userCity) {
          setUserPhone(data.phoneNumber);
          setFullName(data.userFio);
          setAddress(data.userAdress);
          setUserCity(data.userCity);
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
  console.log('userPhone:', userPhone);

  if (userId) {
    // Prepare the data for saving
    const newData = {
      userId,
      fullName, // Use the component state directly
      userPhone, // Use the component state directly
      address,
      userCity,
    };

    // Send the data to the server for updating
    fetch('https://crm.zipperconnect.space/customer/settings/client', {
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
  
const [tgPhoneNumber, setTgPhoneNumber] = useState(null);
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
    const fetchData = async () => {
      // Проверка наличия tgPhoneNumber перед выполнением запроса
      if (!tgPhoneNumber) {
        try {
          setLoading(true);
          const response = await axios.get(
            `https://crm.zipperconnect.space/customer/settings/client/get/${userId}`
          ); // Замените на свой адрес сервера

          // Проверка наличия tgPhoneNumber перед обновлением состояния
          if (response.data && response.data.tgPhoneNumber && tgPhoneNumber !== response.data.tgPhoneNumber) {
            setTgPhoneNumber(response.data.tgPhoneNumber);
          }
        } catch (error) {
          console.error("Error fetching updates:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const intervalId = setInterval(fetchData, 5000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [tgPhoneNumber, userId]); // Включаем tgPhoneNumber и userId в зависимости
  
  const [address, setAddress] = useState(''); // Значение поля "Адрес доставки"
  const [userCity, setUserCity] = useState('');
  const handleDeliveryTypeChange = (newDeliveryType) => {
    setAddress(newDeliveryType);
    // Если выбран "Самовывоз из ПВЗ", устанавливаем "Пункт выдачи" в поле адреса
    if (newDeliveryType === 'pickup') {
      setAddress('');
    } else {
      setAddress(''); // В противном случае сбрасываем поле адреса
    }
  };
  
 return (
    <>
     {isEditing ? (
      <>
           <div className="profile-data">
              <div className='profile-data-title'>
                  Данные доставки
              </div>
                <div className="profile-data-info">
                  <h2>Вид доставки</h2>
                </div>
                <div className="delivery-type-input">
                
                  <button
                   className={`button-delivery`}  
                  >
                  {address === 'pickup' && (
                    <span className="delivery-type-item-outline">
                  <svg width="135" height="100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="134" height="99" rx="19.5" stroke="url(#outline_svg__a)"></rect>
                      <defs><radialGradient id="outline_svg__a" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="rotate(-38.951 123.34 28.893) scale(146.314 152.629)">
                        <stop stopColor="#EB9C00"></stop>
                        <stop offset="0.271" stopColor="#FF4769"></stop>
                        <stop offset="0.664" stopColor="#3D50FF"></stop>
                        <stop offset="1" stopColor="#00B3FF"></stop>
                        </radialGradient></defs>
                  </svg>
                 </span>
                 )}
                    <div className="delivery-type-item-content">
                      <div className="delivery-type-title">
                        Самовывоз <br/>из ПВЗ
                      </div>
                      <div className='bg-delivery-type'></div>
                      <div className="delivery-type-image">
                        <img src="../img/svg/bx4bg.png" alt="" />
                        
                      </div>
                      
                    </div>
                  </button>
                  
                </div>
                 <div className="profile-data-info">
                  <h2>Данные получателя</h2>
                </div>
                 <div className="profile-select-info">
                    <div className="profile-select-input">
                      <label className="profile-select-label">
                        Город
                      </label>
                      <input
                        type="text"
                        className="profile-search-value"
                        value={userCity}
                        onChange={(e) => setUserCity(e.target.value)}
                      />
                       <div className="profile-select-info-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-chevron-right">
                          <path d="M9 6l6 6l-6 6"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                <div className="profile-select-info">
                    <div className="profile-select-input">
                      <label className="profile-select-label">
                        Адрес доставки
                      </label>
                      <input
                        type="text"
                        className="profile-search-value"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
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
                    <input type="text" className="profile-search-value" value={userPhone}
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
                    {imageSrc ? (
                        <div className="profile-avatar">
                          <img src={imageSrc} className="usercard_avatar_img" loading="eager"/>
                        </div>
                      ) : (
                        <div className="profile-avatar">
                          <div  className="profile-avatar-logo">
                          <svg xmlns="http://www.w3.org/2000/svg" width="314" height="251" viewBox="0 0 314 251" fill="none">
                            <path fillRule="evenodd" clipRule="evenodd" d="M34.25 34.0459C3.311 64.7629 0 68.3619 0 71.2859C0 74.1889 2.748 77.2589 26.75 101.159C51.595 125.9 56.173 130.008 58.899 130.008C59.466 130.008 61.521 128.611 63.465 126.904L67 123.801L67.032 185.654C67.057 235.502 67.321 247.848 68.392 249.258C69.639 250.901 75.047 251.008 156.95 251.008H244.179L246.056 248.758C247.846 246.612 247.935 243.685 247.967 185.584L248 124.659L250.25 126.76C251.488 127.915 253.774 129.176 255.33 129.562C257.994 130.224 259.801 128.628 286.08 102.41C311.466 77.0839 314 74.2539 314 71.2279C314 68.1839 311.083 65.0059 279.785 33.9539L245.569 0.00789157H217.32C185.74 0.00789157 187.995 -0.538101 186.55 7.4529C185.573 12.8509 181.754 20.0999 177.806 24.0479C170.838 31.0159 158.373 33.7119 147.601 30.5799C137.855 27.7469 129.476 18.1139 127.548 7.5259C126.08 -0.532103 128.293 0.00588986 96.715 0.0248899L68.5 0.0418882L34.25 34.0459Z" style={{fill: 'var(--tg-text)'}}/>
                          </svg>
                          </div>
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
                  <span className="profile-data-text">{userPhone || 'Не указан'}</span>
                </div>
                <div className="profile-data-info">
                  <span>Город</span>
                  <span className="profile-data-text">{userCity || 'Не указан'}</span>
                </div>
                <div className="profile-data-info">
                  <span>Адрес доставки</span>
                  <span className="profile-data-text">{address || 'Не указан'}</span>
                </div>

                <button className="btn-profile-data-info btn-profile-data" onClick={handleEditClick}>
                Редактировать</button>             
             </div>
              <div className="profile-data">
              <div className='profile-data-title'>
                    Помоги нам
                    <span style={{marginLeft: '5px'}}>✍🏻</span>
                </div>
                <div className="profile-data-info">
                <span style={{marginLeft: '5px'}}>📝
                  <span style={{textAlign:'left'}}>Напиши, что улучшить и получи бонус!</span>
                  </span>
                </div>

                <button className="btn-profile-data-info btn-profile-data">
                Написать</button>             
             </div>
             </>
             )}
    </>
  )
 }

export default ProfilePage;
