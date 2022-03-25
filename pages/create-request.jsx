import style from '../styles/pages/CreateRequest.module.css'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import jwt from 'jsonwebtoken'

const CreateRequest = () => {
    
    const router = useRouter()

    const [userStatus, setUserStatus] = useState('')
    const [completFamily, setCompletFamily] = useState(true)
    const [nativeCountry, setNativeCountry] = useState('')
    const [description, setDescription] = useState('')
    const [adultRefugees, setAdultRefugees] = useState(0)
    const [childrenRefugees, setChildrenRefugees] = useState(0)
    const [possibleCountries, setPossibleCountries] = useState([])

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


    const createRequest = async (e) => {
        e.preventDefault()
        const requestData = {
            userStatus,
            completFamily,
            nativeCountry,
            description,
            adultRefugees,
            childrenRefugees,
            possibleCountries,
            userId : user.userId
        }
        console.log(requestData)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-request`,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(requestData)
        })
        const json = await res.json()
        if(json.success)
            router.push('/host-propositions')
        console.log(json)
    }

    return(
        <content>
            <div className={`${style.formContainer} ${user.isHost && style.requestForm }`}>
                <h1 className={style.title}>Bienvenue {user.name}, créez une demande</h1>
                <p className={style.underline}>Veuillez remplir tout les champs pour completer votre demande</p>
                <form  className={style.form} onSubmit={createRequest}>
                    <div className={style.left}>
                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Pays d'origine</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setNativeCountry(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>

                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Status social</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setUserStatus(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>

                        <div className={style.doubleField}>
                            <div className={style.formFieldContainer}>
                                <label className={style.fieldLabel} htmlFor="name">Nombre d'adultes</label>
                                <input type="number" name="name" className={style.formField}  onChange={(e) => {setAdultRefugees(e.target.value)}}/>
                                <img src="" alt="" className={style.formFieldIcon}/>
                            </div>
                            <div className={style.formFieldContainer}>
                                <label className={style.fieldLabel} htmlFor="name">Nombre d'enfants</label>
                                <input type="number" name="name" className={style.formField}  onChange={(e) => {setChildrenRefugees(e.target.value)}}/>
                                <img src="" alt="" className={style.formFieldIcon}/>
                            </div>
                        </div>
                        <button type="submit" className={style.submitButton}>Créer une proposition</button>
                    </div>
                    <div className={style.right}>
                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Quel pays pouvez vous aller</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setPossibleCountries([e.target.value])}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>
                        <div className={`${style.formFieldContainer} ${style.descriptionField}`}>
                            <label className={style.fieldLabel} htmlFor="name">Description</label>
                            <textarea name="name" className={`${style.formField}`}  onChange={(e) => {setDescription(e.target.value)}}></textarea>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>

                    </div>
                </form>
            </div>
            
        </content>
    )
}


export default CreateRequest