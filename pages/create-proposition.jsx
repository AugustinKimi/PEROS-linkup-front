import style from '../styles/pages/CreateRequest.module.css'
import {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import jwt from 'jsonwebtoken'

const CreateRequest = () => {

    const router = useRouter()

    const [userStatus, setUserStatus] = useState('')
    const [country, setCountry] = useState(true)
    const [city, setCity] = useState('')
    const [houseSize, setHouseSize] = useState('')
    const [bedsNumber, setBedsNumber] = useState(0)
    const [hostCapacity, setHostCapacity] = useState(0)
    const [description, setDescription] = useState('')

    const [user, setUser] = useState({})

    useEffect(() => {
        if(window){
            const token = window.localStorage.getItem("token")
            if(token) {
                const userData = jwt.decode(token)
                // if(!userData.isHost) router.push()
                setUser(userData)
            }
        }
    }, [])


    const createRequest = async (e) => {
        e.preventDefault()
        const requestData = {
            userStatus,
            country,
            city,
            houseSize,
            bedsNumber,
            hostCapacity,
            description,
            userId : user.userId
        }
        console.log(requestData)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/create-proposition`,
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
            router.push('/refugee-requests')
        // if(json.success) 
        console.log(json)
    }

    return(
        <content>
            <div className={`${style.formContainer} ${user.isHost && style.propositionForm }`}>
                <h1 className={style.title}>Bienvenue {user.name}, créez une propositon</h1>
                <p className={style.underline}>Veuillez remplir tout les champs pour completer votre proposition</p>
                <form  className={style.form} onSubmit={createRequest}>
                    <div className={style.left}>

                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Pays de résidence</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setCountry(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>

                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Statut social</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setUserStatus(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>

                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Combien de personnes pouvez-vous héberger ?</label>
                            <input type="number" name="name" className={style.formField}  onChange={(e) => {setHostCapacity(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>

                        <div className={style.doubleField}>
                            <div className={style.formFieldContainer}>
                                <label className={style.fieldLabel} htmlFor="name">Nombre de lits</label>
                                <input type="number" name="name" className={style.formField}  onChange={(e) => {setBedsNumber(e.target.value)}}/>
                                <img src="" alt="" className={style.formFieldIcon}/>
                            </div>
                            <div className={style.formFieldContainer}>
                                <label className={style.fieldLabel} htmlFor="name">Taille en m² du lieu</label>
                                <input type="number" name="name" className={style.formField}  onChange={(e) => {setHouseSize(e.target.value)}}/>
                                <img src="" alt="" className={style.formFieldIcon}/>
                            </div>
                        </div>
                        <button type="submit" className={style.submitButton}>Créer une proposition</button>
                    </div>
                    <div className={style.right}>
                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Ville résident</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setCity(e.target.value)}}/>
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