
import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect, useState } from 'react';
import CloudStorage from './CloudStorage';


function ProfilePage() {
  const { user } = useTelegram();
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
 const [phoneNumber, setPhoneNumber] = useState('');
  const [requestStatus, setRequestStatus] = useState('');

  const requestPhoneNumber = () => {
    window.Telegram.WebApp.requestContact((sent, event) => {
      if (sent) {
        const contact = event && event.responseUnsafe && event.responseUnsafe.contact;
        if (contact && contact.phone_number) {
          setPhoneNumber(`+${contact.phone_number}`);
          setRequestStatus('Phone number sent to the bot');
        }
      } else {
        setRequestStatus('User declined this request');
      }
    });
  };



  return (
    <>
        <div className="profile-header">
            <div className="profile-avatar-box">
                <div className="profile-avatar-transparent">
                    <div className="profile-avatar">
                    <InitialsAvatar
                        className="profile-avatar"
                        userName={user?.first_name}
                        entityId={2}
                        entityName={`${user?.first_name}`}
                        size={100}
                        theme="apple"
                        
        />
                    </div>
             <div className="profile-name">{user?.first_name}</div>
                </div>
            </div>
        </div>
            <div className="profile-data">
                      <h2>Телефон</h2>
                
                      <button onClick={requestPhoneNumber}>Request Phone Number</button>
      <p>
        {requestStatus && (
          <span className={requestStatus === 'Phone number sent to the bot' ? 'ok' : 'err'}>
            {`(${requestStatus}${phoneNumber ? `: ${phoneNumber}` : ''})`}
          </span>
        )}
      </p>
              <CloudStorage />
                
                    

             </div>
    </>
  )
}

export default ProfilePage;
