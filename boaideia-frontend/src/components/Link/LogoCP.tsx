import Link from 'next/link'
import React from 'react'
import styles from './Link.module.css'

export default function LogoCP() {
    return (
        <Link href="/">
            <a>
                <img src="logo.png" alt="Logo Boa Idéia" />
            </a>
        </Link>
    )
}
