import { useState } from "react"
import style from "../styles/pages/Login.module.css"
import jwt from 'jsonwebtoken'
import {useRouter} from 'next/router'
import Link from 'next/link'


const Login = () => {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        const requestData = {
            email,
            password
        }

        console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login-user`,
        {
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(requestData)
        })
        const json = await res.json()
        console.log(json)
        if(json.success) {
            window.localStorage.setItem("token", json.token)
            const user = jwt.decode(json.token)
            if(user.isHost) router.push("/refugee-requests")
            else  router.push("/host-propositions")
        }
    }

    return(
        <content className={style.signupFormContainer} style={{}}>
            <div className={style.formContainer}>
                <span className={style.topLine}>Déja membre ?</span>
                <h1 className={style.title}>Connectez vous !</h1>
                <span className={style.loginLink}>Pas inscrit ? <Link href="/sign-up/host"><a className={style.connectLink} href="/sign-up/host">Inscrivez-vous.</a></Link></span>
                <form  className={style.signupForm} onSubmit={handleLogin}>
                    <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="email">Email</label>
                        <input type="email" name="email" className={style.formField} onChange={(e) =>{setEmail(e.target.value)}} />
                        <img src="" alt="" className={style.formFieldIcon}/>
                    </div>
                    <div className={style.formFieldContainer}>
                            <label className={style.fieldLabel} htmlFor="password">Mot de passe</label>
                        <input type="password" name="password" className={style.formField} onChange={(e) =>{setPassword(e.target.value)}} />
                        <img src="" alt="" className={style.formFieldIcon}/>
                    </div>

                    <button type="submit" className={style.submitButton}>Se connecter</button>
                </form>
            </div>
            <img src="/images/connexion-welcome.svg" alt="welcome illustration" className={style.illustration}/>
        </content>
    )
}

export default Login