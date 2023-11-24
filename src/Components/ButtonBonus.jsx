import { useState, useEffect } from "react";
import "./css/Buttons.css";
import { Link } from "react-router-dom";

function ButtonBonus({userId}) {
  const [userBonus, setUserBonus] = useState(0);

  useEffect(() => {
      const data = {
      userId
    };
    const fetchUserBonus = async () => {
      try {
        const response = await fetch("https://crm.zipperconnect.space/api/get/bonus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error(`Запрос завершился со статусом ${response.status}`);
        }
          const responseData = await response.json();
          setUserBonus(responseData.userBonus);
        } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
    }
  };

    fetchUserBonus();
  }, [userId]);

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
