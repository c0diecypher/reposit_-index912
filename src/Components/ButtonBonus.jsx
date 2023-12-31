import { useState, useEffect } from "react";
import "./css/Buttons.css";
import { Link } from "react-router-dom";
import axios from 'axios';

function ButtonBonus({userId}) {
  const [userBonus, setUserBonus] = useState(0);

 useEffect(() => {
    reloadBonus();
    SendData();
  }, [userId]);

  const reloadBonus = () => {
    // Извлечение бонуса из Local Storage
    const storedBonus = window.Telegram.WebApp.CloudStorage.getItems(["userBonus"], (err, values) => {
      if (!err && values.userBonus) {
        setUserBonus(values.userBonus);
      } else {
        // Если бонус отсутствует в CloudStorage, выполнить запрос к серверу
        fetchData();
      }
    });

    // Слушатель событий для обновления бонуса
    const eventSource = new EventSource(`https://crm.zipperconnect.space/connect/bonus/${userId}`);
    eventSource.onmessage = function (event) {
      const bonus = JSON.parse(event.data);

      // Обновление бонуса в Local Storage и состоянии компонента
      window.Telegram.WebApp.CloudStorage.setItem("userBonus", bonus, (err, saved) => {
        if (err) {
          console.error("Error saving bonus to CloudStorage", err);
        } else {
          setUserBonus(bonus); // Обновление состояния userBonus
        }
      });
    };
  };

  const fetchData = async () => {
    await axios.post(`https://crm.zipperconnect.space/get/bonus/${userId}`, {
      userId: userId,
    });
  };

  const SendData = async () => {
    fetchData();
  };


  return (
    <>
      <div className='action-buttons'>
        <div className='action-card'>
          <Link to={`/bonus/`}>
            <div className='action-card-QWE13S'>
                <div className='action-card-QWE13B'></div>
                <div className='action-card-bg'>
                    <div className="action-inner">
                        <div className="action-head">
                            <div className="action-title">Бонусов</div>
                        </div>
                        <div className="action-footer">
                            <div className="action-poinst-title">₽</div>
                            <div className="action-poinst-icon">{userBonus}</div>
                        </div>
                    </div>
                </div>
            </div>
           </Link> 
        </div>
        <div className="action-card-IQWEA2">
          <div className='action-card-QWE13A'>
            <div className='action-card-bg'>
              <div className="action-inner">
                <div className="action-head" >
                  <div className="action-title" style={{webkitTextFillColor: 'var(--tg-text)'}}>Зови друзей</div>
                </div>
                <div className="action-footer">
                  <div className="action-poinst-icon" style={{webkitTextFillColor: 'var(--tg-hint)', fontSize: '12px',textAlign:'left',fontWeight: '400'}}>подарим тебе и <br/>другу <span>500₽</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ButtonBonus;
