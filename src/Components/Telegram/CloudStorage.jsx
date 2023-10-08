import { useState, useEffect } from 'react';

function CloudStorage() {
  const [cloudStorageKeys, setCloudStorageKeys] = useState([]);
  const [cloudStorageItems, setCloudStorageItems] = useState({});
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const cleanHTML = (text) => {
    // Ваша логика очистки HTML
    return text;
  };

  useEffect(() => {
    loadCloudKeys();
  }, []);

  const loadCloudKeys = () => {
    window.Telegram.WebApp.CloudStorage.getKeys((err, keys) => {
      if (err) {
        showAlert('Error: ' + err);
      } else {
        if (keys.length > 0) {
          window.Telegram.WebApp.CloudStorage.getItems(keys, (err, values) => {
            if (err) {
              showAlert('Error: ' + err);
            } else {
              setCloudStorageKeys(keys);
              const items = {};
              for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                items[key] = values[key];
              }
              setCloudStorageItems(items);
            }
          });
        }
      }
    });
  };

  const editCloudRow = (key) => {
    setEditKey(key);
    setEditValue(cloudStorageItems[key]);
  };

  const deleteCloudRow = (key) => {
    window.Telegram.WebApp.CloudStorage.removeItem(key, (err, deleted) => {
      if (err) {
        showAlert('Error: ' + err);
      } else {
        if (deleted) {
          const updatedKeys = cloudStorageKeys.filter((k) => k !== key);
          setCloudStorageKeys(updatedKeys);
          const updatedItems = { ...cloudStorageItems };
          delete updatedItems[key];
          setCloudStorageItems(updatedItems);
        }
      }
    });
  };

  const saveCloudForm = (event) => {
    event.preventDefault();
    window.Telegram.WebApp.CloudStorage.setItem(editKey, editValue, (err, saved) => {
      if (err) {
        showAlert('Error: ' + err);
      } else {
        if (saved) {
          const updatedItems = { ...cloudStorageItems };
          updatedItems[editKey] = editValue;
          setCloudStorageItems(updatedItems);
          setEditKey('');
          setEditValue('');
        }
      }
    });
  };

  const showAlert = (message) => {
    // Ваша логика отображения сообщения об ошибке
    console.log(message);
  };

  const requestPhoneNumber = () => {
    window.Telegram.WebApp.requestContact((sent, event) => {
      if (sent) {
        const contact = event && event.responseUnsafe && event.responseUnsafe.contact;
        if (contact && contact.phone_number) {
          setPhoneNumber(`+${contact.phone_number}`);
          setRequestStatus('Phone number sent to the bot');
          // Сохраните номер как ключ в состоянии или облаке, значение оставьте пустым
          setEditKey(`phone_${contact.phone_number}`);
          setEditValue('');
        }
      } else {
        setRequestStatus('User declined this request');
      }
    });
  };

  return (
    <div>
      <h1>Cloud Storage</h1>
      <button onClick={requestPhoneNumber}>Request Phone Number</button>
      <p>
        {requestStatus && (
          <span className={requestStatus === 'Phone number sent to the bot' ? 'ok' : 'err'}>
            {`(${requestStatus}${phoneNumber ? `: ${phoneNumber}` : ''})`}
          </span>
        )}
      </p>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cloudStorageKeys.map((key) => (
            <tr key={key}>
              <td>{cleanHTML(key)}</td>
              <td>{cleanHTML(cloudStorageItems[key])}</td>
              <td>
                <button onClick={() => editCloudRow(key)}>Edit</button>
                <button onClick={() => deleteCloudRow(key)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={saveCloudForm}>
        <input
          type="text"
          placeholder="Key"
          value={editKey}
          onChange={(e) => setEditKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CloudStorage;
