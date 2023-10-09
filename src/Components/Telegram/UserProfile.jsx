import { useEffect, useState } from "react";
import { useTelegram } from "../Hooks/useTelegram";
import { InitialsAvatar } from "@twa-dev/mark42";
import "../../css/body.css"

function UserProfile() {
   const { user } = useTelegram();
  const [peerWrapVisible, setPeerWrapVisible] = useState(false);
  const [peerName, setPeerName] = useState("");
  const [peerPhotoUrl, setPeerPhotoUrl] = useState("");

  useEffect(() => {
    if (user) {
      setPeerWrapVisible(true);
      setPeerName({user?.first_name});
      if (user?.photo_url) {
        setPeerPhotoUrl({user?.photo_url});
      }
    } else if (user) {
      setPeerWrapVisible(true);
      setPeerName({user?.title});
      if ({user?.photo_url}) {
        setPeerPhotoUrl({user?.photo_url});
      }
    }
  }, []);

  return (
    <div>
      {peerWrapVisible && (
        <div id="peer_wrap" style={{ display: 'block' }}>
          <div id="peer_name">{peerName}</div>
          {peerPhotoUrl ? (
            <img id="peer_photo" src={peerPhotoUrl} alt="Peer Photo" />
          ) : (
            <div id="peer_photo" style={{ display: 'none' }}></div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
