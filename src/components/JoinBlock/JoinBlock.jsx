import React from 'react';
import axios from 'axios';

import styles from './JoinBlock.module.scss';

function JoinBlock({onLogin}) {

   const [roomId, setRoomId] = React.useState('');
   const [userName, setUserName] = React.useState('');
   const [isLoading, setIsLoading] = React.useState(false);

   const changeRoomId = (evt) => {
      setRoomId(evt.target.value);
   }

   const changeUserName = (evt) => {
      setUserName(evt.target.value);
   }

   const onEnter = async () => {
      if (!roomId || !userName) {
         return alert('Неверные данные');
      } else {

         const obj = {
            roomId,
            userName,
         };

         setIsLoading(true);
         await axios.post('/rooms', obj);
         onLogin(obj)
      }
   }

   const handleKeyUp = (evt) => {
      if (evt.keyCode === 13) {
        onEnter()
       }
   }

  return (
   <div className={styles.joinBlockBg}>
   <div className={styles.joinBlockBgWhite}>
   <div className={styles.joinBlock}>
      <input type='text' placeholder='Room ID' value={roomId} onChange={changeRoomId} onKeyUp={handleKeyUp}></input>
      <input type='text' placeholder='Ваше имя' value={userName} onChange={changeUserName} onKeyUp={handleKeyUp}></input>
      <button onClick={onEnter} disabled={isLoading}>{isLoading? 'Вход...' : 'Войти'}</button>
   </div>
   </div>
   </div>
   )
   
}

export default JoinBlock;