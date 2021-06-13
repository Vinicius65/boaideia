import React from 'react'
import styles from './Link.module.css'
import Link from 'next/link'


export default function LinkCP({ href, children }: { href: string, children: any }) {
    return (
        <Link href={href}>
            <a className={styles.link}>
                {children}
            </a>
        </Link>
    )
}
