
import React, { useState , useRef} from 'react';
import './App.css';
// import { Auth } from './Component/Auth';
import { Auth } from './Component/Auth';
import { Chat } from './Component/Chat';

import Cookies from "universal-cookie";
import { signOut } from 'firebase/auth';
import { auth } from './firbase-config';
import './style/Chat.css'
import './style/Auth.css'

const cookies = new Cookies();
// dividing app into two authenticated and not authenticated

function App() {
  

  
   const [isAuth, setIsAuth] = useState(cookies.get("auth-token")) // if cookies has the token then isauth will be true
   const [room, setRoom] = useState(null);

   const roomInputRef = useRef(null)
   const SignUserOut = async () =>{
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
   }
   if(!isAuth){
      return (<div>

        <Auth setIsAuth={setIsAuth}/>

        </div>);
   }

   return (
      <>
      {room ? (<Chat room={room} />
      ) : (
      <div className='room'> 
      <label> Enter room Name</label>
      <input ref={roomInputRef}/>
      <button onClick={()=> setRoom(roomInputRef.current.value)}>
      enter chat</button> 
      </div>
      )}
      <div className="sign-out">
        <button onClick={SignUserOut}>Sign out</button>
      </div>
      </>
      );
   }

export default App;
