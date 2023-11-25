import { useState, useEffect } from "react";
import "./css/Buttons.css";
import { Link } from "react-router-dom";
import axios from 'axios';

function ButtonBonus({userId}) {
  const [userBonus, setUserBonus] = useState('');

  useEffect(() => {
  // Attach the onmessage event handler
  const eventSource = new EventSource(`https://crm.zipperconnect.space/connect/bonus`);
  
  // Log the EventSource for debugging
  console.log(eventSource);

  // Clean up the EventSource when the component unmounts
  return () => {
    eventSource.close();
  };
}, []); // Empty dependency array ensures this effect runs only once on mount

const loadBonus = async () => {
  const data = {
    userId,
  };

  try {
    const response = await fetch('https://crm.zipperconnect.space/get/bonus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Запрос завершился со статусом ${response.status}`);
    }

    // Call reloadBonus only after the successful response
    reloadBonus();
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
  }
};

const reloadBonus = async () => {
  // Load bonus data (if needed)
  const eventSource = new EventSource(`https://crm.zipperconnect.space/connect/bonus`);

  // Attach the onmessage event handler
  eventSource.onmessage = (event) => {
    console.log('Received message:', event.data);
    const bonusData = JSON.parse(event.data);

    // Update user bonus using the previous state
    setUserBonus(prev => [bonusData]);
    console.log(bonusData);
  };

  // Clean up the EventSource when the component unmounts
  return () => {
    eventSource.close();
  };
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
