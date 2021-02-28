import styles from "./Startup.module.css";
import TextField from "@material-ui/core/TextField";
import React, { useContext, useState } from "react";
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { UserContext } from "../../services/context/userContext";
import api from "../../services/request";
import { useRouter } from 'next/router'
import { Link } from "@material-ui/core";


export default function SartupCP({ style = {} }) {
    const { setUser } = useContext(UserContext);
    const router = useRouter()


    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [showpassowrd, setshowpassowrd] = useState(false);
    const [inlogin, setinlogin] = useState(false);

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        try {
            inlogin ? logar() : cadastrar();
            router.push('project')
        }
        catch {
            console.log("verique o usuário ou a senha");
        }
    }

    const cadastrar = async () => {
        const user = await api.cadastrar({ name, email, password });
        setUser(user);
    }

    const logar = async () => {
        const user = await api.logar({ email, password });
        setUser(user);
    }

    const instyle = {
        nameInput: {
            marginBottom: inlogin ? '4rem' : '0rem',
            transition: '1s 0.2s all'
        }
    }

    return (
        <form method='POST' onSubmit={handleSubmit} className={`${styles.container} surface`} noValidate autoComplete="off" style={style}>
            <ButtonGroup className={styles.buttonGroup} color="primary" aria-label="outlined primary button group">
                <Button className={!inlogin ? styles.grow : ''} onClick={() => { setinlogin(!inlogin) }} variant={!inlogin ? 'contained' : 'outlined'}>Cadastro</Button>
                <Button className={inlogin ? styles.grow : ''} onClick={() => { setinlogin(!inlogin) }} variant={inlogin ? 'contained' : 'outlined'}>Login</Button>
            </ButtonGroup>

            <div className={styles.inputGroup}>
                <TextField
                    className={inlogin ? styles.name : styles.nameActive}
                    id="name"
                    name="name"
                    label="Nome"
                    variant="outlined"
                    value={name}
                    onChange={({ target }) => setname(target.value)}
                />
                <TextField
                    id="email"
                    name="email"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={({ target }) => setemail(target.value)}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        style={instyle.nameInput}
                        id="standard-adornment-password"
                        type={showpassowrd ? 'text' : 'password'}
                        value={password}
                        onChange={({ target }) => setpassword(target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setshowpassowrd(!showpassowrd)}
                                    onMouseDown={(evt) => evt.preventDefault()}
                                    edge="end"
                                >
                                    {showpassowrd ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                {inlogin && <Link href="#" style={{ marginLeft: '1rem' }}>Esqueci a senha</Link>}

                            </InputAdornment>
                        }
                        labelWidth={70}
                    />

                </FormControl>

            </div>

            <div className={styles.startupButton} style={{ margin: `${!inlogin ? 3 : 1}rem ${!inlogin ? 3 : 5}rem 2rem`, transition: '1s all' }}>
                <Button type='submit' variant="contained" size="large" color="primary">
                    {inlogin ? 'Entrar' : 'Criar Conta'}
                </Button>
            </div>
            <footer className={styles.footer}>
                <p>Copyright © Your Website 2021.</p>
            </footer>
        </form>

    );
}
