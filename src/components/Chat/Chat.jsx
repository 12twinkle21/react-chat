import React from 'react';

import styles from './Chat.module.scss';

import socket from '../../socket';

function Chat({ users, messages, userName, roomId }) {
   
   const [messageValue, setMessageValue] = React.useState('');
   const messagesRef = React.useRef(null)

   const onChangeTextArea = (evt) => {
      setMessageValue(evt.target.value)
    }

   const onSendMessage = () => {
      socket.emit('ROOM:NEW_MESSAGE', {
         userName,
         roomId,
         text: messageValue,
      })
      setMessageValue('');
   }

   const handleKeyUp = (evt) => {
      if (evt.keyCode === 13) {
         onSendMessage();
       }
   }

   React.useEffect(() => {
      messagesRef.current.scrollTo(0, 99999);
   },[messages])

  return (
     <div className={styles.chat}>
        <div className={styles.users}>
           <p>Комната: <b>{roomId}</b></p>
           <hr/>
           <b>Онлайн({users.length}) :</b>
           <ul>
              {users.map((name, index) => <li key={name + index}>{name}</li>)}
           </ul>
        </div>
        <div className={styles.chatMessages}>
           <div className={styles.messages} ref={messagesRef}>
              {
                 messages.map((message, index) => <div className={styles.message} key={message+index}>
                    <p>{message.text}</p>
                    <span>{message.userName}</span>
              </div>)
              }
              
           </div>
        
        <div className={styles.form}>
        <form>
                 <textarea value={messageValue} onChange={onChangeTextArea} onKeyUp={handleKeyUp}/>
              </form>
              <button onClick={onSendMessage}>Отправить</button>
           </div>
           </div>
     </div>
     
  )
}

export default Chat;