import style from '../styles/pages/Explorer.module.css'
import Link from 'next/link'
import jwt from 'jsonwebtoken'
import { useEffect,useState } from 'react'

const PropositionsExplorer = ({propositions}) => {
    return(
        <content >
            <Explorer key={"propositions"} propositions={propositions}/>
        </content>
    )
}


const Explorer = ({propositions}) =>{

    const [user, setUser] = useState({})

    useEffect(() => {
        if(window){
            const token = window.localStorage.getItem("token")
            if(token) {
                const userData = jwt.decode(token)
                setUser(userData)
            }
        }
    }, [])

    return(
        <div className={`${style.explorerContainer} ${style.propositionsContainer}`}>
            <span className={style.topLine}>Bienvenue {user.name}</span>
            <h1 className={style.title}>Rechercher un lieu d'acceuil</h1>
            <div className={style.searchContainer}>
                <img src="/icons/ubiuef.svg"  className={style.searchIcon} />
                <input type="text" className={style.searchInput} placeholder="Entrer un pays ou un nom ..." />
                <button className={style.searchButton}>Rechercher</button>
            </div>

            <div className={style.explorerContainer}>
                {propositions.map((proposition, index) => {
                    return <Proposition key={index} proposition={proposition}/>
                })}

            </div>
        </div>
    )
}


const Proposition = ({proposition}) => {
    console.log(proposition)
    return(
        <div className={style.proposition}>
            <img src="" alt="Profil picture" className={style.profilPicture} />

            <div className={style.userInfos}>
                <span className={style.userName}>{proposition.user.name} {proposition.user.lastName}</span>
                <SmallInfo iconUrl={'/icon/ijjef.svg'} info={proposition.isStudent ? "Etudiant" : "Travailleur"}/>
                <SmallInfo iconUrl={'/icon/map-icon.svg'} info={`${proposition.city}, ${proposition.country}`}/>
            </div>

            <div className={style.separator}></div>

            <div className={style.postInfos}>
                <SmallInfo iconUrl={'/icon/house-icon.svg'} info={proposition.completFamily ? "Famille complète" : "Famille séparé"}/>
                <SmallInfo iconUrl={'/icon/ijjef.svg'} info={`${proposition.adultRefugees} Adultes`}/>
                <SmallInfo iconUrl={'/icon/people-icon.svg'} info={`${proposition.childrenRefugees} Enfants`}/>
            </div>

            <div className={style.separator}></div>

            <p className={style.description}>{proposition.description}</p>

            <div className={style.separator}></div>

            <Link href={`/messages/${proposition.userId}`}><a className={style.contactButton}>Contacter</a></Link>

        </div>
    )
}

const SmallInfo = ({iconUrl, info}) => {
    return(
        <div className={style.smallInfo}>
            <img src={iconUrl} alt="Icon"  className={style.infoIcon}/>
            <span className={style.info}>{info}</span>
        </div>
    )
}
export default PropositionsExplorer


export async function getServerSideProps(context) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/get-all-propositions`,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    })
    const json = await res.json()
    console.log(json)

    
    // Pass data to the page via props
    return { props: { propositions : json.data } }
  }