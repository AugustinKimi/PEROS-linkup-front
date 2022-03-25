import { useState, useEffect } from "react"
import fetchUserData from "../lib/fetchUserData";
import style from '../styles/components/Conversations.module.css'
import db from "../lib/firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const Conversations = ({user}) => {
    const [messages, setMessages] = useState([])


    useEffect( () => {
        console.log(user)
        if(!user.userId) return
        db.collection("messages")
        .where("toUserId", "==", user.userId)
        .orderBy('createdAt')
        .limit(50)
        .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        })


       
    },[])

    return(
        <div className={style.conversationContainer}>
            {messages.map(async (message, index) => {
                const userData = await fetchUserData(message.fromUserId)
                console.log(userData)
                if(!userData) return null
                return(
                    <div key={index} className={style.message}> {message.fromUserId} {userData.name} {userData.lastName}</div>
                )
            })}
        </div>
    )
}


export default Conversations