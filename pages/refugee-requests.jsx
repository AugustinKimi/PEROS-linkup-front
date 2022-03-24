import style from '../styles/pages/Explorer.module.css'
import jwt from 'jsonwebtoken'
import { useEffect,useState } from 'react'

const RequestExplorer = ({requests}) => {
    return(
        <content >
            <Explorer key={"requests"} requests={requests}/>
        </content>
    )
}


const Explorer = ({requests}) =>{

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
        <div className={`${style.explorerContainer} ${style.requestsContainer}`}>
            <span className={style.topLine}>Bienvenue {user.name}</span>
            <h1 className={style.title}>Rechercher une personnes à aider</h1>
            <div className={style.searchContainer}>
                <img src=""  className={style.searchIcon} />
                <input type="text" className={style.searchInput} placeholder="Entrer un pays ou un nom ..." />
                <button className={style.searchButton}>Rechercher</button>
            </div>

            <div className={style.explorerContainer}>
                {requests.map((request, index) => {
                    return <Request key={index} request={request}/>
                })}

            </div>
        </div>
    )
}


const Request = ({request}) => {
    console.log(request)
    return(
        <div className={style.request}>
            <img src="" alt="Profil picture" className={style.profilPicture} />

            <div className={style.userInfos}>
                <span className={style.userName}>{request.user.name} {request.user.lastName}</span>
                <SmallInfo iconUrl={'/icon/ijjef.png'} info={request.isStudent ? "Etudiant" : "Travailleur"}/>
                <SmallInfo iconUrl={'/icon/map-icon.png'} info={request.nativeCountry}/>
            </div>

            <div className={style.separator}></div>

            <div className={style.postInfos}>
                <SmallInfo iconUrl={'/icon/ijjef.png'} info={request.completFamily ? "Famille complète" : "Famille séparé"}/>
                <SmallInfo iconUrl={'/icon/ijjef.png'} info={`${request.adultRefugees} Adultes`}/>
                <SmallInfo iconUrl={'/icon/ijjef.png'} info={`${request.childrenRefugees} Enfants`}/>
            </div>

            <div className={style.separator}></div>

            <p className={style.description}>{request.description}</p>

            <div className={style.separator}></div>

            <button className={style.contactButton}>Contacter</button>

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
export default RequestExplorer


export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:8080/api/get-all-requests`,
    {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    })
    const json = await res.json()
    
    // Pass data to the page via props
    return { props: { requests : json.data } }
  }