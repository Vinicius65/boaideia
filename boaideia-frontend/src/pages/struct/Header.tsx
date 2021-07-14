import React, { useContext } from 'react'
import LinkCP from '../../components/Link/LinkCP'
import LogoCP from '../../components/Link/LogoCP'
import colors from '../../styles/colors'
import { useRouter } from 'next/router'
import { UserContext } from '../../services/context/UserContext'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ButtonCP from '../../components/Button/ButtonCP'
import styles from '../Index.module.css';
import Link from 'next/link'

export default function Header() {
    const context = useContext(UserContext);
    const { isLogged, getUser, logout } = context
    const user = getUser();


    return (
        <header className={styles.header}>
            <nav>
                <Link href="/home" >
                    <div style={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}>
                        <p style={{
                            fontSize: "2rem",
                            color: 'white'
                        }}> Boa ideia</p>
                    </div>
                </Link>
             
                {isLogged() ?
                    <Logged username={user?.username} logout={logout} /> :
                    <NotLoggedIn />
                }
            </nav>
        </header>
    )
}



const Logged = ({ logout, username }: { logout: () => void, username?: string }) => {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleOutClose = () => {
        setAnchorEl(null);
    };

    const handleInClose = () => {
        setAnchorEl(null);
        logout();
    };

    return (
        <ul>
            <li>
                <Link href='/my-projects'>
                    <a>
                        Meus Projetos
                    </a>
                </Link>

            </li>
            <li>
                <Link href='/my-contributions'>
                    <a>
                        Contribuiões
                    </a>
                </Link>

            </li>
            <li>
                <Link href='/'>
                    <a>
                        Avaliações
                    </a>
                </Link>

            </li>

            <li>
                <a onClick={handleClick}>
                    Meu Perfil
                </a>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleOutClose}
                >
                    <MenuItem onClick={handleInClose}>Sair</MenuItem>
                </Menu>
            </li>
        </ul>
    )
}
const NotLoggedIn = () => {
    const router = useRouter();
    const logInOrRegister = router.asPath === "/login" ? ["/register", "Registre-se"] : ["/login", "Entrar"];

    return (
        <LinkCP href={logInOrRegister[0]}>
            {logInOrRegister[1]}
        </LinkCP>
    )
}
