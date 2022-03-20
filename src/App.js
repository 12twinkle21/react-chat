import React from 'react';

import reducer from './reducer';

import socket from './socket';

import JoinBlock from './components/JoinBlock/JoinBlock';
import Chat from './components/Chat/Chat';

function App() {

   const [state, dispatch] = React.useReducer(reducer, {
      joined: false,
      roomId: null,
      userName: null,
      users: [],
      messages: [],
   });

   const onLogin = (obj) => {
      dispatch({
         type: 'SET_AUTH_STATE',
         payload: obj,
      });
      socket.emit('ROOM:JOIN', obj)
   };
   
   const setUsers = (users) => {
      dispatch({
         type: 'SET_USERS',
         payload: users,
      })
   }

   React.useEffect(() => {

      socket.on('ROOM:JOINED', setUsers);
      socket.on('ROOM:SET_USERS', setUsers);
      socket.on('ROOM:NEW_MESSAGE', message => {
         dispatch({
            type: 'NEW_MESSAGE',
            payload: message,
         });
      });

   }, []);

   return (
     
     <div className='wrapper'>
         {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} />}
      </div>
      
  );
}

export default App;
