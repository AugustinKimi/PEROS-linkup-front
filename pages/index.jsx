import Link from "next/link"
import style from "../styles/pages/Home.module.css"


const HomePage = () => {


    return(
        <content>
            <div className={style.homeContainer}>
                <div className={style.left}>
                    <h1 className={style.title}>La plateforme qui<br/>connecte le monde entier</h1>
                    <p className={style.underline}>Nous mettons en relation des réfugiés du monde entier avec des familles d'accueil partout dans le monde</p>
                    <div className={style.linksContainer}>
                        <Link href="/sign-up/host"><a className={`${style.linkButton} ${style.hostLink}`}>Créer un compte en tant que hote</a></Link>
                        <Link href="/sign-up/refugee"><a className={`${style.linkButton} ${style.refugeeLink}`}>Créer un compte en tant que refugié</a></Link>
                    </div>
                </div>
                <div className={style.illustrationContainer}>

                    <img src="/images/welcome-blue.svg" alt="" className={style.illustration}/>
                </div>
            </div>

        </content>
    )
}

export default HomePage