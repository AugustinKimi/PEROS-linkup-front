import style from "../../styles/pages/Signup.module.css"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"

const SignUp = () => {

    const router = useRouter()
    const form = useRef()
    const {userStatus} = router.query

    useEffect(() =>{
        form.current.style.setProperty("--bg-color-accent", userStatus == "host" ? "var(--bg-color-host)" :  "var(--bg-color-refugee)")
    }, [userStatus])

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {   
        e.preventDefault()

        const requestData = {
            name, 
            lastName,
            email,
            password,
            isHost :  userStatus == "host" ,
            isRefugee :  userStatus == "refugee" ,
        }
        const res = await fetch(`http://localhost:8080/api/add-user`,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(requestData)
        })
        const json = await res.json()
        if(json.success) router.push('/login')
        console.log(json)
    }

    return(
        <content ref={form} className={style.signupFormContainer} style={{}}>
            <div className={style.formContainer}>
                <span className={style.topLine}>Je suis un {userStatus == "host" ? "HOTE" :  "Réfugiée"}</span>
                <h1 className={style.title}>Créer un compte.</h1>
                <span className={style.loginLink}>Déja membre ? <a className={style.connectLink} href="/login">Se connecter</a></span>
                <form  className={style.signupForm} onSubmit={handleSubmit}>
                    <div className={style.nameContainer}>
                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="name">Prénom</label>
                            <input type="text" name="name" className={style.formField}  onChange={(e) => {setName(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>
                        <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="lastName">Nom</label>
                            <input type="text" name="lastName" className={style.formField}  onChange={(e) => {setLastName(e.target.value)}}/>
                            <img src="" alt="" className={style.formFieldIcon}/>
                        </div>
                    </div>
                   
                    <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="email">Email</label>
                        <input type="email" name="email" className={style.formField}  onChange={(e) => {setEmail(e.target.value)}}/>
                        <img src="" alt="" className={style.formFieldIcon}/>
                    </div>
                    <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" className={style.formField} onChange={(e) => {setPassword(e.target.value)}} />
                        <img src="" alt="" className={style.formFieldIcon}/>
                    </div>

                    <button type="submit" className={style.submitButton}>Créer un compte</button>
                </form>
            </div>
            <img src={`/images/${userStatus == "host" ? "hote-welcome.svg" : "refugie-welcome.svg"}`} alt="welcome illustration" className={style.illustration}/>
        </content>
    )
}

export default SignUp