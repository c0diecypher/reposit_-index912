import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainButton } from "@twa-dev/sdk/react"
import { BackButton } from "@twa-dev/sdk/react"

function SettingsProfile() {
  const { user } = useTelegram();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [fullName, setFullName] = useState(''); // Исходное значение
  const [phoneNumber, setPhoneNumber] = useState(''); // Исходное значение
  const [color] = useState(window.Telegram.WebApp.themeParams.button_color);
  const [textColor] = useState(
    window.Telegram.WebApp.themeParams.button_text_color
  );
  const handleSaveClick = ({userId}) => {
    // Собираем данные из полей ввода
  
    // Создаем объект с данными, включая userId
    const newData = {
      userId,
      fullName,
      phoneNumber,
    };
  
    // Отправляем данные на сервер
    fetch('https://zipperconnect.space/customer/settingsProfile', {
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
        setUserData(data);
        // Опционально: отобразите сообщение об успешном сохранении
        alert('Данные успешно сохранены!');
      })
      .catch((err) => {
        // Обработка ошибки
        setError(err);
      });
      <BackButton/>
  };

  return (
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
                        text={`Сохранить`}
                        color={color}
                        textColor={textColor}
                        />
    </>
  )
}

export default SettingsProfile;
