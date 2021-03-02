import styles from "./Startup.module.css";
import React, { useContext, useState } from "react";
import { UserContext } from "../../services/context/userContext";
import api from "../../services/request";
import TextInputCP from "../Input/TextInputCP";
import ButtonPrimaryCP from "../Button/ButtonCP";
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "@material-ui/core";
import { FeedbackContext } from "../../services/context/feedbackContext";


type TProp = {
    isRegister: boolean;
    setIsRegister: () => void;
    style?: object;
}

export default function RegisterCP({ isRegister, setIsRegister, style = {} }: TProp) {
    const { setUser } = useContext(UserContext);
    const { setFeedback } = useContext(FeedbackContext);


    const [name, setname] = useState("");
    const [email, setemail] = useState("");

    const [password, setpassword] = useState("");
    const [confirm, setconfirm] = useState("");

    const [termo, settermo] = useState(false);


    const handleSubmit = async (evt: any) => {
        evt.preventDefault();
        try {
            const user = await api.cadastrar({ name, email, password });
            setUser(user);
            setFeedback({
                isVisible: true,
                message: 'Você será redirecionado em instantes..',
                title: 'Cadastrado com sucesso ;)',
                type: 'success'
            })
        }
        catch (ex) {
            console.log(ex.message);
            setFeedback({
                isVisible: true,
                message: ex.message,
                title: 'Erro ao cadastrar',
                type: 'error'
            })

        }
    };

    return (
        <form className={styles.form} method="POST" onSubmit={handleSubmit} style={style} noValidate autoComplete="off">
            <h2 className={styles.cadastrese}>Cadastre-se</h2>
            <div>
                <TextInputCP
                    style={{ marginBottom: "1rem" }}
                    label="Nome"
                    name="name"
                    value={name}
                    onChange={setname}
                />
                <TextInputCP
                    style={{ marginBottom: "1rem" }}
                    label="Email"
                    name="email"
                    value={email}
                    onChange={setemail}
                />
                <div className="flex">
                    <TextInputCP
                        style={{ marginRight: "1rem" }}
                        label="Senha"
                        name="password"
                        value={password}
                        type='password'
                        onChange={setpassword}
                    />

                    <TextInputCP
                        label="Confirme sua senha"
                        name="confirm"
                        type='password'
                        value={confirm}
                        onChange={setconfirm}
                    />
                </div>
                <div className={styles.options}>
                    <div className={styles.controlCheckbox}>
                        <Checkbox
                            checked={termo}
                            onChange={() => settermo(!termo)}
                            name='termos'
                            id='termos'
                        />
                        <label htmlFor='termos'>Aceito os termos de uso</label><div />
                    </div>
                    <Link onClick={setIsRegister} href='#'>Já tenho conta</Link>
                </div>
            </div>
            <div className='flex'>
                <ButtonPrimaryCP variant='primary' type='submit' style={{ margin: "2rem" }}>
                    criar conta
                </ButtonPrimaryCP>
            </div>
        </form>
    )
}
