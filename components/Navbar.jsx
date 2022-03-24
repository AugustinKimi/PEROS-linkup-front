import Link from 'next/link'
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import style from  '../styles/components/Navbar.module.css'

const Navbar = () => {
    const router = useRouter()
    const [userIsConnected, setUserIsConnected] = useState(false)
    const [user, setUser] = useState('false')

    useEffect(() =>{
        console.log('update')
        if(window){
            const token = window.localStorage.getItem("token")
            if(token){
                const data = jwt.decode(token)
                setUserIsConnected(true)
                setUser(data)
            } 
            else{
                setUser({})
                setUserIsConnected(false) 
            }
            console.log(token)
        }
    },[router.pathname])

    const disconnectUser = () => {
        window.localStorage.removeItem("token")
        setUserIsConnected(false)
    }

    return(
        <nav className={style.navbar}>
              <Link href='/'><a><img src="/linkup-logo.svg" alt="" className={style.logo} /></a></Link>
            <ul className={style.navLinks}>
                <Link href="/"><a><li>Acceuil</li></a></Link>
                {user?.isHost && <Link href="/refugee-requests"><a><li>Listes des réfugiés</li></a></Link>}
                {user?.isRefugee && <Link href="/host-propositions"><a><li>Listes des hotes</li></a></Link>}
                
                {!userIsConnected && <Link href="/sign-up/host"><a><li>S'inscrire comme hôte</li></a></Link> }
                {!userIsConnected && <Link href="/sign-up/refugee"><a><li>S'inscrire comme réfugié</li></a></Link> }
                
                
                <Link href="/about"><a><li>A propos</li></a></Link>
            </ul>
            {!userIsConnected ? 
                <Link href='/login'><a className={style.connectLink}>Se connecter</a></Link> :
                <button onClick={disconnectUser} className={style.connectLink}>Se déconnecter</button>
            }
            
        </nav>
    )
}

export default Navbar