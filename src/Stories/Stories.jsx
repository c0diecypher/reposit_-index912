import "./css/Stories.css";


function Stories() {
  const handleZipperApp = () => {
    // Вызываем метод Telegram.WebApp.openLink с опциями
    Telegram.WebApp.openLink('https://telegra.ph/api', { try_instant_view: true });
  };
  return (
    <>
    <div className="Stories-box">
      
        <button className="Stories" onClick={handleZipperApp}>
          <span className="Stories-item">
            <svg
              width="104"
              height="104"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63 0c18.856 0 28.284 0 34.142 5.858C103 11.716 103 21.144 103 40v23c0 18.856 0 28.284-5.858 34.142C91.284 103 81.856 103 63 103H40c-18.856 0-28.284 0-34.142-5.858C0 91.284 0 81.856 0 63V40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0Zm1 1c17.913 0 26.87 0 32.435 5.565C102 12.13 102 21.087 102 39v25c0 17.913 0 26.87-5.565 32.435C90.87 102 81.913 102 64 102H39c-17.913 0-26.87 0-32.435-5.565C1 90.87 1 81.913 1 64V39C1 21.087 1 12.13 6.565 6.565 12.13 1 21.087 1 39 1Z"
                fill="url(#outline_svg__a)"
                fillRule="evenodd"
              ></path>
              <defs>
                <radialGradient
                  id="outline_svg__a"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="matrix(86.81435 -94.74057 100.69038 92.26638 7.063 86.481)"
                >
                  <stop stopColor="#EB9C00"></stop>
                  <stop offset="0.271" stopColor="#FF4769"></stop>
                  <stop offset="0.664" stopColor="#3D50FF"></stop>
                  <stop offset="1" stopColor="#00B3FF"></stop>
                </radialGradient>
              </defs>
            </svg>
          </span>
          <div
            className="Story-item-content"
            style={{
              background:
                "linear-gradient(rgb(250,92,203) 0%,rgb(	218, 92, 250) 200%)"
            }}
          >
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
            <div className="Story-item-title" style={{ color: "#fcf0fe" }}>
              Что умеет Zipper Store?
            </div>
          </div>
        </button>
      
      <button className="Stories">
        <span className="Stories-item">
          <svg
            width="104"
            height="104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M63 0c18.856 0 28.284 0 34.142 5.858C103 11.716 103 21.144 103 40v23c0 18.856 0 28.284-5.858 34.142C91.284 103 81.856 103 63 103H40c-18.856 0-28.284 0-34.142-5.858C0 91.284 0 81.856 0 63V40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0Zm1 1c17.913 0 26.87 0 32.435 5.565C102 12.13 102 21.087 102 39v25c0 17.913 0 26.87-5.565 32.435C90.87 102 81.913 102 64 102H39c-17.913 0-26.87 0-32.435-5.565C1 90.87 1 81.913 1 64V39C1 21.087 1 12.13 6.565 6.565 12.13 1 21.087 1 39 1Z"
              fill="url(#outline_svg__a)"
              fillRule="evenodd"
            ></path>
            <defs>
              <radialGradient
                id="outline_svg__a"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(86.81435 -94.74057 100.69038 92.26638 7.063 86.481)"
              >
                <stop stopColor="#EB9C00"></stop>
                <stop offset="0.271" stopColor="#FF4769"></stop>
                <stop offset="0.664" stopColor="#3D50FF"></stop>
                <stop offset="1" stopColor="#00B3FF"></stop>
              </radialGradient>
            </defs>
          </svg>
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

      <button className="Stories">
        <span className="Stories-item">
          <svg
            width="104"
            height="104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M63 0c18.856 0 28.284 0 34.142 5.858C103 11.716 103 21.144 103 40v23c0 18.856 0 28.284-5.858 34.142C91.284 103 81.856 103 63 103H40c-18.856 0-28.284 0-34.142-5.858C0 91.284 0 81.856 0 63V40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0Zm1 1c17.913 0 26.87 0 32.435 5.565C102 12.13 102 21.087 102 39v25c0 17.913 0 26.87-5.565 32.435C90.87 102 81.913 102 64 102H39c-17.913 0-26.87 0-32.435-5.565C1 90.87 1 81.913 1 64V39C1 21.087 1 12.13 6.565 6.565 12.13 1 21.087 1 39 1Z"
              fill="url(#outline_svg__a)"
              fillRule="evenodd"
            ></path>
            <defs>
              <radialGradient
                id="outline_svg__a"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(86.81435 -94.74057 100.69038 92.26638 7.063 86.481)"
              >
                <stop stopColor="#EB9C00"></stop>
                <stop offset="0.271" stopColor="#FF4769"></stop>
                <stop offset="0.664" stopColor="#3D50FF"></stop>
                <stop offset="1" stopColor="#00B3FF"></stop>
              </radialGradient>
            </defs>
          </svg>
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

      <button className="Stories">
        <span className="Stories-item">
          <svg
            width="104"
            height="104"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M63 0c18.856 0 28.284 0 34.142 5.858C103 11.716 103 21.144 103 40v23c0 18.856 0 28.284-5.858 34.142C91.284 103 81.856 103 63 103H40c-18.856 0-28.284 0-34.142-5.858C0 91.284 0 81.856 0 63V40C0 21.144 0 11.716 5.858 5.858 11.716 0 21.144 0 40 0Zm1 1c17.913 0 26.87 0 32.435 5.565C102 12.13 102 21.087 102 39v25c0 17.913 0 26.87-5.565 32.435C90.87 102 81.913 102 64 102H39c-17.913 0-26.87 0-32.435-5.565C1 90.87 1 81.913 1 64V39C1 21.087 1 12.13 6.565 6.565 12.13 1 21.087 1 39 1Z"
              fill="url(#outline_svg__a)"
              fillRule="evenodd"
            ></path>
            <defs>
              <radialGradient
                id="outline_svg__a"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(86.81435 -94.74057 100.69038 92.26638 7.063 86.481)"
              >
                <stop stopColor="#EB9C00"></stop>
                <stop offset="0.271" stopColor="#FF4769"></stop>
                <stop offset="0.664" stopColor="#3D50FF"></stop>
                <stop offset="1" stopColor="#00B3FF"></stop>
              </radialGradient>
            </defs>
          </svg>
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
