import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firbase-config";
import "../style/Chat.css"
import '../style/Auth.css'




export const Chat = (props) => {
    const {room} = props;
    const [newMessage , setNewMessage] = useState("")
    const [messages ,setMessages]= useState([]);



    const messageRef = collection(db, "messages");

    useEffect(() => { 
        const queryMessage = query(messageRef, where("room","==",room),
        orderBy("createdAt")
        );
       const unsuscribe = onSnapshot(queryMessage, (snapshot)=>{
             let messages = [];
             snapshot.forEach((doc) =>{
              messages.push({...doc.data(), id:doc.id});
             });
             setMessages(messages);

        });
        return () => unsuscribe();
    },[])


    const handleSubmit = async(e) =>{  // grabbing event from the form
             e.preventDefault();

             if(newMessage === "") return;
             await addDoc(messageRef, {
                  text: newMessage,
                  createdAt: serverTimestamp(),
                  user: auth.currentUser.displayName,
                  room: room,

             });

             setNewMessage("")
    };

    return (
    <div className="chat-app"> 
    <div className="header"> 
    <h1>Welcome to: {room} Room</h1>
    </div>
    <div className="messages"> 
        {messages.map((messages) => (
         <div className="message" key={messages.id}> 
         <span className="user">{messages.user} </span>
         {messages.text}
         </div>
        
        ))}
    </div>
    <form onSubmit={handleSubmit} className="new-message-form">
        <input 
         className="new-message-input"
         placeholder="type your message"
         onChange={(e) => setNewMessage(e.target.value)}
         value = {newMessage}
        />
    <button type="submit" className="send-button">
    Send
    </button>
    </form>
    </div>
    );
}