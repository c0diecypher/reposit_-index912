import "./css/Stories.css";


function Stories() {
  const handleZipperApp = () => {
    // Вызываем метод Telegram.WebApp.openLink с опциями
    Telegram.WebApp.openLink('https://teletype.in/@zipperstore/zipperapp', { try_instant_view: true });
  };

  const handleDelivery = () => {
    Telegram.WebApp.openLink('https://teletype.in/@zipperstore/delivery', { try_instant_view: true });
  };

  const handleSize = () => {
    Telegram.WebApp.openLink('https://teletype.in/@zipperstore/size', { try_instant_view: true }); 
  }

  return (
    <>
    <div className="Stories-box">
      
        <button className="Stories"  onClick={handleZipperApp}>
          <span className="Stories-item">
            
          </span>
          <div
            className="Story-item-content"
          >
            <div className="story-bg"></div>
            <div className="Story-item-image">
              <img
                className="Story-item-image-image-img"
                draggable="false"
                width="30"
                height="30"
                decoding="async"
                src="/img/svg/handshop.png"
              />
            </div>
            <div className="Story-item-title" style={{ color: "var(--tg-text)" }}>
              Что умеет Zipper Store?
            </div>
          </div>
        </button>
      
      <button className="Stories" >
        <span className="Stories-item">
        </span>
        <div
          className="Story-item-content"
          style={{
            background:
              "linear-gradient(rgb(250, 218, 92) 0%, rgb(250, 218, 92) 100%)"
          }}
        >
          <div className="Story-item-image">
            <img
              className="Story-item-image-image"
              draggable="false"
              width="30"
              height="30"
              decoding="async"
              src="/img/svg/gift.png"
            />
          </div>
          <div className="Story-item-title">Зови друзей! +500₽ </div>
        </div>
      </button>

      <button className="Stories" onClick={handleDelivery}>
        <span className="Stories-item">
        </span>
        <div
          className="Story-item-content"
          style={{
            background:
              "linear-gradient(rgb(250, 92, 124) 0%, rgb(248,18,64) 100%)"
          }}
        >
          <div className="Story-item-image">
            <img
              className="Story-item-image-images"
              draggable="false"
              decoding="async"
              src="/img/svg/rocket.png"
            />
          </div>
          <div className="Story-item-title" style={{ color: "#fef0f3" }}>
            Доставка{""}
          </div>
        </div>
      </button>

      <button className="Stories" onClick={handleSize}>
        <span className="Stories-item">
        </span>
        <div
          className="Story-item-content"
          style={{
            background:
              "linear-gradient(rgb(250,250,250) 0%, rgb(230,230,230) 100%)"
          }}
        >
          <div className="Story-item-image">
            <img
              className="Story-item-image-img"
              draggable="false"
              width="30"
              height="30"
              decoding="async"
              src="/img/svg/cm.png"
            />
          </div>
          <div className="Story-item-title" style={{ color: "black" }}>
            Как выбрать размер правильно
          </div>
        </div>
      </button>
    </div>
    </>
  );
}

export default Stories;
