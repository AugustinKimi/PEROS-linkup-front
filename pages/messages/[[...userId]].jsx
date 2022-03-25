import { useState, useEffect } from "react"
import fetchUserData from "../../lib/fetchUserData"
import style from "../../styles/pages/Messages.module.css"
import jwt from 'jsonwebtoken'
import {useRouter} from 'next/router'
import ChatMessages from "../../components/ChatMessages"
import Conversations from "../../components/Conversations"


const Messages = () => {
    const [user, setUser] = useState({})
    const [toUser, setToUser] = useState({})

    const router = useRouter()
    const {userId} = router.query
    useEffect(async () => {
        if(window){
            const token = window.localStorage.getItem("token")
            if(token) {
                const userData = jwt.decode(token)
                setUser(userData)
            }
            
        }
    }, [])

    useEffect(async () => {
        if(userId){
            const res = await fetchUserData(parseInt(userId[0]))
            if(res.success){
                setToUser(res.userData)
            }
        }
    },[userId])

    return(
        <content>
            <div className={style.messagesContainer}>
                <Conversations user={user}/>
                <ChatMessages user={user} toUser={toUser}/>
                <div className={style.userInfosPlaceholder}></div>
            </div>
            {/* {toUser &&<UserProfil toUser={toUser}/>} */}
        </content>
    )
}

export default Messages