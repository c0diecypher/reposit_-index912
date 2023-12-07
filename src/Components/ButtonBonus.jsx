import { useState, useEffect } from "react";
import "./css/Buttons.css";
import { Link } from "react-router-dom";
import axios from 'axios';

function ButtonBonus({userId}) {
  const [userBonus, setUserBonus] = useState(0);

  useEffect(() => {
    fetchData();
    SendData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://crm.zipperconnect.space/get/bonus/${userId}`);
      const bonus = response.data;

      // Сохранение бонуса в Local Storage
      window.Telegram.WebApp.CloudStorage.setItem("userBonus", bonus.toString(), (err, saved) => {
        if (err) {
          console.error("Ошибка сохранения бонуса в CloudStorage", err);
        } else {
          console.log("Бонус сохранен в CloudStorage");
        }
      });

      // Обновление userBonus только если он изменился
      if (bonus.toString() !== userBonus) {
        setUserBonus(bonus.toString());
        console.log("Бонус обновлен из сервера");
      } else {
        console.log("Бонус не изменился из сервера");
      }
    } catch (error) {
      console.error("Ошибка при получении бонуса с сервера", error);
    }
  };

  const SendData = async () => {
    await axios.post(`https://crm.zipperconnect.space/get/bonus/${userId}`, {
      userId: userId,
    });
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
