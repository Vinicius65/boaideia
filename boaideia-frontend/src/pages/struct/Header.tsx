import React from 'react'
import LinkCP from '../../components/Link/LinkCP'
import LogoCP from '../../components/Link/LogoCP'
import colors from '../../styles/colors'
import { useRouter } from 'next/router'


export default function Header() {

    return (
        <header className='flex-between-center' style={{
            padding: '.3rem 6rem',
            marginBottom: "2rem",
            backgroundColor: colors.black
        }}>
            <LogoCP />
            <NotLoggedIn />
        </header>
    )
}



const Logged = () => {
    return (
        <nav>
            <LinkCP href="/">
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