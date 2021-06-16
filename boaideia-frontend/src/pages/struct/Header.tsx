import React, { useContext } from 'react'
import LinkCP from '../../components/Link/LinkCP'
import LogoCP from '../../components/Link/LogoCP'
import colors from '../../styles/colors'
import { useRouter } from 'next/router'
import { UserContext } from '../../services/context/UserContext'


export default function Header() {
    const context = useContext(UserContext);
    const { isLogged, getUser, logout } = context

    return (
        <header className='flex-between-center' style={{
            padding: '.3rem 6rem',
            marginBottom: "2rem",
            backgroundColor: colors.black
        }}>
            <LogoCP />
            {isLogged() ?
                <Logged logout={logout} /> :
                <NotLoggedIn />
            }
        </header>
    )
}



const Logged = ({ logout }: { logout: () => void }) => {
    return (
        <nav>
            <LinkCP onClick={() => { logout(); }} href="/">
                Logout
            </LinkCP>
        </nav>
    )
}
const NotLoggedIn = () => {
    const router = useRouter();
    const logInOrRegister = router.asPath === "/login" ? ["/register", "Register"] : ["/login", "Login"];

    return (
        <nav>
            <LinkCP href={logInOrRegister[0]}>
                {logInOrRegister[1]}
            </LinkCP>
        </nav>
    )
}