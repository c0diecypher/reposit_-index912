import { useState, useEffect } from 'react';
import './css/ProfilePage.css'
function CloudStorage() {
  const [cloudStorageKeys, setCloudStorageKeys] = useState([]);
  const [cloudStorageItems, setCloudStorageItems] = useState({});
  const [editKey, setEditKey] = useState('');
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    loadCloudKeys();
  }, []);

  const cleanHTML = (text) => {
    // Ваша логика очистки HTML
    return text;
  };

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
    const value = cloudStorageItems[key];
    setEditKey(key);
    setEditValue(value);
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

  return (
    <div>
      <h1>Cloud Storage</h1>
      <table>
        <thead>
          <tr>
            <th>Номер телефона</th>
            <th>ФИО</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {cloudStorageKeys.map((key) => (
            <tr key={key}>
              <td>{cleanHTML(key)}</td>
              <td>{cleanHTML(cloudStorageItems[key])}</td>
              <td>
                <button onClick={() => editCloudRow(key)}>Изменить</button>
                <button onClick={() => deleteCloudRow(key)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form onSubmit={saveCloudForm}>
        <input
          type="text"
          placeholder="Номер телефона"
          value={editKey}
          onChange={(e) => setEditKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="ФИО"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default CloudStorage;
