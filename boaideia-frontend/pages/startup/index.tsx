import React from 'react'
import ApresentationCP from '../../components/Apresentation/ApresentationCP';
import StartupCP from '../../components/Startup/StartupCP'
import styles from './Startup.module.css'

function Startup() {


    return (
        <main className={styles.container}>
            <div className={styles.apresentacao}>
                <ApresentationCP />
            </div>
            <div className={styles.loginCadastro}>
                <StartupCP />
            </div>
        </main>
    )
}

export default Startup;