import styles from "./Startup.module.css";
import React, { useContext, useState } from "react";
import TextInputCP from "../Input/TextInputCP";
import ButtonPrimaryCP from "../Button/ButtonCP";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "@material-ui/core";
import { signIn } from "next-auth/client";
import Api from "../../services/request";

type TProp = {
    isRegister: boolean;
    setIsRegister: () => void;
    style?: object;
};

export default function RegisterCP({
    isRegister,
    setIsRegister,
    style = {},
}: TProp) {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");

    const [password, setpassword] = useState("");
    const [confirm, setconfirm] = useState("");
    const [termo, settermo] = useState(false);

    const handleSubmit = async (evt: any) => {
        evt.preventDefault();
        const respUser = await Api.cadastrar({ email, name, password });
        signIn('credentials', { email, password });
    };

    return (
        <div className={styles.form}>
            <h2 className={styles.cadastrese}>Cadastre-se</h2>

            <button
                onClick={() => {
                    signIn("google");
                }}
            >
                Entrar com sua conta google
            </button>
            <form
                method="POST"
                onSubmit={handleSubmit}
                style={style}
                noValidate
                autoComplete="off"
            >
                <span
                    style={{ textAlign: "center", display: "block", marginTop: "1rem" }}
                >
                    <strong>ou</strong>
                </span>
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
                            type="password"
                            onChange={setpassword}
                        />

                        <TextInputCP
                            label="Confirme sua senha"
                            name="confirm"
                            type="password"
                            value={confirm}
                            onChange={setconfirm}
                        />
                    </div>
                    <div className={styles.options}>
                        <div className={styles.controlCheckbox}>
                            <Checkbox
                                checked={termo}
                                onChange={() => settermo(!termo)}
                                name="termos"
                                id="termos"
                            />
                            <label htmlFor="termos">Aceito os termos de uso</label>
                            <div />
                        </div>
                        <Link onClick={setIsRegister} href="#">
                            Já tenho conta
                        </Link>
                    </div>
                </div>
                <div className="flex">
                    <ButtonPrimaryCP
                        variant="primary"
                        type="submit"
                        style={{ margin: "2rem" }}
                    >
                        criar conta
                    </ButtonPrimaryCP>
                </div>
            </form>
        </div>
    );
}
