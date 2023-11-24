
import "./css/Refer.css";
import ClipboardJS from 'clipboard';
import { useState } from "react";

function BonusPage({userId}) {
  
  const [isCopied, setIsCopied] = useState(false);
    const handleCopyClick = () => {
        const clipboard = new ClipboardJS('.link-button-copy');
        clipboard.on('success', (e) => {
          // Успешное копирование
          e.clearSelection();
          setIsCopied(true);
        });
      };

  return (
    <>
        <div className="refer-friend-section">
            <div className="refer-friend-image">
                <div className="refer-friend-emoji">
                    <img src="../../img/img/emojisky.com-11765234.png" alt="" />
                </div>
                
                
            </div>
            <div className="refer-friend-title">Зови друзей!
            Подарим по
                    <div className="refer-friend-title-gradient"> 1000 рублей </div>
                     каждому!
            </div>
            <div className="refer-friend-selection-box">
                <p><div className="refer-friend-title-gradient"><strong>Бонусы</strong></div> <strong>начислим после того как заказ</strong> пользователя, перешедшего по реферальной ссылке, <strong>был отправлен в Россию.</strong></p>
                <p><strong>Акция</strong> действует <strong>до 10 января</strong>. <br />После 10 января вы будете получать <div className="refer-friend-title-gradient"><strong>+500 бонусов</strong></div> за приглашенного друга</p>
            </div>
        </div>
        <div className="link-refer-friends">
            <div className="link-refer-friends-title">Твоя ссылка на приглашение</div>
            <div className="link-refer-friends-linkuser">https://t.me/zipperstore_bot?start={userId}</div>
            <div className="link-button-copy" data-clipboard-text={`https://t.me/zipperstore_bot?start=${userId}`} onClick={handleCopyClick}>{isCopied ? 'Скопировано ✅' : 'Скопировать'} <span className="light"></span></div>  
        </div>
    </>
  )
}

export default BonusPage;
