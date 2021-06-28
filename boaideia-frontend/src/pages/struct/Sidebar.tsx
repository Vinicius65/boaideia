import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useContext } from 'react';
import UserProfile from '../../components/User/UserProfile';
import { UserContext } from '../../services/context/UserContext';
import styles from '../Index.module.css';

export default function Sidebar() {
    const { getUser, isLogged } = useContext(UserContext);
    const router = useRouter();
    const user = getUser();
    if (!isLogged() || router.pathname !== '/home') return null;


    return (
        <nav className={styles.sidebarContainer}>
            <h2>
                <UserProfile username='Vinicius' />
            </h2>
            <ul>
                <li>
                    <Link href='/'>
                        <a>
                            Meu Perfil
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href='/'>
                        <a>
                            Meus Projetos
                        </a>
                    </Link>

                </li>
                <li>
                    <Link href='/'>
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

            </ul>
        </nav>
    )
}
