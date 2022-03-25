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
        setUser({})
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
                <DropDownMenu disconnectUser={disconnectUser} user={user}/>
            }
            
        </nav>
    )
}

const DropDownMenu = ({user, disconnectUser}) => {

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }
 
    return(
        <div className={style.dropMenu}>
            <Link href={`/create-${user.isHost ? "proposition" : "request"}`}><a className={style.createReqProp}>Créer une {user.isHost ? "proposition" : "demande"}</a></Link>
            <span onClick={toggleMenu}>{user.name}</span>
            <div onClick={toggleMenu} className={`${style.dropArrow} ${menuOpen ? style.openArrow : style.closeArrow}`}>
                <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 7.5L7.5 1.5L13.5 7.5" stroke="#76809D" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className={`${style.menuContainer} ${menuOpen ? style.openMenu : style.closeMenu}`}>
                <span onClick={disconnectUser}>Se déconnecter</span>
                <Link href="/messages"><a>Messages</a></Link>
                <span>Profil</span>
            </div>
        </div>
    )
}

export default Navbar