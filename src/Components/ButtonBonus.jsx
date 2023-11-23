
import "./css/Buttons.css";

function ButtonBonus() {
  

  return (
    <>
      <div className='action-buttons'>
        <div className='action-card'>
            <div className='action-card-QWE13S'>
            <svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="animatedGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style={{ stopColor: '#f79533' }} />
      <stop offset="25%" style={{ stopColor: '#ef4e7b' }} />
      <stop offset="50%" style={{ stopColor: '#5073b8' }} />
      <stop offset="75%" style={{ stopColor: '#07b39b' }} />
    </linearGradient>
  </defs>
</svg>
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
