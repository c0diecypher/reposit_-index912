
import '../../css/body.css'
import './css/ProfilePage.css'
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import { useEffect } from 'react';

function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при загрузке страницы
  }, []);
  const { user } = useTelegram();

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
    </>
  )
}

export default ProfilePage;
