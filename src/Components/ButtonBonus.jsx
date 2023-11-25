import { useState, useEffect } from "react";
import "./css/Buttons.css";
import { Link } from "react-router-dom";
import axios from 'axios';

function ButtonBonus({userId}) {
  const [userBonus, setUserBonus] = useState(0);
  
  useEffect(() => {
      reloadBonus();
    },[]);
  
  const reloadBonus = async () => {
    loadBonus();
    const eventSource = new EventSource(`https://crm.zipperconnect.space/connect/bonus`);
    console.log(eventSource);
    
    eventSource.onmessage = (event) => {
      const bonusData = JSON.parse(event.data);
      setUserBonus(prev => [bonusData]);
      console.log(bonusData);
    }
  }
    
   const loadBonus = async () => {
    const data = {
      userId,
    }
    try {
      const response = await fetch('https://crm.zipperconnect.space/load/basket/paid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
      throw new Error(`Запрос завершился со статусом ${response.status}`);
    }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
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
