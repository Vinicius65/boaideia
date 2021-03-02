import styles from "./Startup.module.css";
import React, { useContext, useState } from "react";
import RegisterCP from "./RegisterCP";
import LoginCP from "./LoginCP";
import LoadingCP from "../Feedback/LoadingCP";

export default function SartupCP() {
    const [isRegister, setIsRegister] = useState(true)
    const handleSwap = () => { setIsRegister(!isRegister) };


    return (
        <div className={`${styles.container} surface`}>
            {isRegister ?
                <RegisterCP isRegister={isRegister} setIsRegister={handleSwap} /> :
                <LoginCP isRegister={isRegister} setIsRegister={handleSwap} />
            }
            <footer className={styles.footer}>
                <p>Copyright © Your Website 2021.</p>
                <LoadingCP style={{ margin: '2rem auto 0' }} />
            </footer>
        </div>
    );
}
