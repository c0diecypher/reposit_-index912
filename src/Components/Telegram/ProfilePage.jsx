
import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect, useState } from 'react';

function ProfilePage() {
  const { user } = useTelegram();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [savedData, setSavedData] = useState(null);

  // Функция для сохранения данных в облаке
  const saveDataToCloud = () => {
    if (fullName && phoneNumber) {
      window.Telegram.CloudStorage.setItem('user_data', JSON.stringify({ fullName, phoneNumber }), (error, success) => {
        if (success) {
          alert('Данные успешно сохранены в облаке Telegram.');
        } else {
          alert('Произошла ошибка при сохранении данных.');
        }
      });
    } else {
      alert('Пожалуйста, заполните ФИО и номер телефона.');
    }
  };

  // Функция для получения данных из облака
  const getDataFromCloud = () => {
    window.Telegram.CloudStorage.getItem('user_data', (error, data) => {
      if (data) {
        setSavedData(JSON.parse(data));
      } else {
        alert('Данные не найдены в облаке Telegram.');
      }
    });
  };

  useEffect(() => {
    getDataFromCloud();
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
             <div className="profile-name">{user?.first_name}Admin</div>
                                    </div>
                                </div>
                            </div>
                                <div className="profile-data">
                                <div>
                          <h1>Форма для сохранения данных в облаке Telegram</h1>
                          <div>
                            <label>ФИО:</label>
                            <input
                              type="text"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                          </div>
                          <div>
                            <label>Номер телефона:</label>
                            <input
                              type="text"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                          </div>
                          <button onClick={saveDataToCloud}>Сохранить в облаке</button>
                          {savedData && (
                            <div>
                              <h2>Сохраненные данные:</h2>
                              <p>ФИО: {savedData.fullName}</p>
                              <p>Номер телефона: {savedData.phoneNumber}</p>
                            </div>
                          )}
                        </div>
             </div>
    </>
  )
}

export default ProfilePage;
