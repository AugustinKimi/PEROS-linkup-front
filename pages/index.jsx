import Link from "next/link"
import style from "../styles/pages/Home.module.css"


const HomePage = () => {


    return(
        <content>
            <div className={style.linksContainer}>
                <Link href="/sign-up/host"><a className={`${style.linkButton} ${style.hostLink}`}>Créer un compte en tant que hote</a></Link>
                <Link href="/sign-up/refugee"><a className={`${style.linkButton} ${style.refugeeLink}`}>Créer un compte en tant que refugié</a></Link>
            </div>

        </content>
    )
}

export default HomePage