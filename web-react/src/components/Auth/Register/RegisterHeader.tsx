import styles from "../module.loginStyle.module.css";


type Props ={
    title: string, 
    subtitle : string, 
}


export default function RegisterHeader({ title,subtitle}: Readonly<Props>){

    return (
        <div className={styles.loginHeader} >
            <h1 className={styles.authTitle}>{title}</h1>
            <p className= {styles.authIntro}> {subtitle} </p>
        </div>
       )
}