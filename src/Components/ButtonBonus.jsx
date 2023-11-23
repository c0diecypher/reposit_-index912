
import "./css/Buttons.css";

function ButtonBonus() {
  

  return (
    <>
      <div className='action-buttons'>
        <div className='action-card'>
            <div className='action-card-QWE13S'>
              <div className='action-card-QWE13B'></div>
                <div className='action-card-bg'>
                    <div className="action-inner">
                        <div className="action-head">
                            <div className="action-title">Бонусов</div>
                        </div>
                        <div className="action-footer">
                            <div className="action-poinst-title">₽</div>
                            <div className="action-poinst-icon">0</div>
                        </div>
                    </div>
                </div>
            </div>
            
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
