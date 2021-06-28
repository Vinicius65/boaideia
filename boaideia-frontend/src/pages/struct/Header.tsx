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

export default function Header() {
    const context = useContext(UserContext);
    const { isLogged, getUser, logout } = context
    const user = getUser();


    return (
        <header className={styles.header}>
            <nav>
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
        <>
            <button style={{
                backgroundColor: colors.black,
                display: 'flex',
                alignItems: 'center'
            }} onClick={handleClick}>
                <img src="user.png" alt="User Image" />
                <p style={{ color: 'white', fontSize: '1.5rem', marginLeft: '.5rem' }}>
                    {username}
                </p>
            </button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleOutClose}
            >
                <MenuItem onClick={handleInClose}>Sair</MenuItem>
            </Menu>
        </>
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