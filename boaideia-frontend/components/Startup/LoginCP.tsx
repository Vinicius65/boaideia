import styles from "./Startup.module.css";
import React, { useState } from "react";
import TextInputCP from "../Input/TextInputCP";
import ButtonPrimaryCP from "../Button/ButtonCP";
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "@material-ui/core";
import { signIn } from 'next-auth/client'


type TProp = {
    isRegister: boolean;
    setIsRegister: () => void,
    style?: object
}

export default function LoginCP({ isRegister, setIsRegister, style }: TProp) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [lembrar, setlembrar] = useState(true);

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        signIn('credentials', { email, password });
    };

    return (
        <form className={styles.form} style={style} method="POST" onSubmit={handleSubmit} noValidate autoComplete="off">
            <div style={{ width: 40, height: 40, margin: '0 auto', color: 'red' }}>
                <svg focusable="false"

                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path fill='red' d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                    </path>
                </svg>
            </div>
            <h2 className={styles.cadastrese}>Login</h2>

            <div>
                <TextInputCP
                    style={{ marginBottom: "1rem" }}
                    label="Email"
                    name="email"
                    value={email}
                    onChange={setemail}
                />
                <TextInputCP
                    style={{ marginRight: "1rem" }}
                    label="Senha"
                    name="password"
                    value={password}
                    type='password'
                    onChange={setpassword}
                />
            </div>
            <div className={styles.options}>
                <div className={styles.controlCheckbox}>
                    <Checkbox
                        checked={lembrar}
                        onChange={() => setlembrar(!lembrar)}
                        name='termos'
                        id='termos'
                    />
                    <label htmlFor='termos'>Lembrar de mim</label><div />
                </div>
                <Link onClick={setIsRegister} href='#'>Não tenho conta</Link>
            </div>
            <div className='flex'>
                <ButtonPrimaryCP type='submit' style={{ margin: "2rem" }}>
                    Logar
                </ButtonPrimaryCP>
            </div>
        </form>
    )
}
