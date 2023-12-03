
import "./css/Banner.css";
import "./css/Ballons.css";


const Banner = () => {
    return (
        <>
        
        <div className='banner-buttons'>
          
          <div className='banner-card'>
         
              <div className='banner-card-QWE13S'>
                <div className='banner-card-QWE13B'></div>
                <div className="banner-gradient-bg"></div>
                <div className='banner-card-bg'>
                  
                  <div className="banner-inner">
                    <div className="banner-head">
                      <div className="banner-title">Праздничное событие</div>
                      <div className="banner-badge">До 9 февраля</div>
                    </div>
                    <div className="ballons-anim">
                        <div className="balloon"></div>
                        <div className="balloon"></div>
                      </div>
                    <span className="banner-body-title">МЫ <br/>ОТКРЫЛИСЬ</span>
                      
                    <div className="banner-footer">
                        
                      <div className='banner-box-bg'>
                        <span className="banner-box-text">первые скидки</span>
                        <span className="banner-box-title">ДАРИМ 
                        <br/>1000 БОНУСОВ</span>
                      </div>
                    

                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </>
    );
  }

export default Banner;
