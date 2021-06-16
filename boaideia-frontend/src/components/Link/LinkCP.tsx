import React from 'react'
import styles from './Link.module.css'
import Link from 'next/link'

type TLink = {
    href: string,
    children: any,
    [props: string]: any
}

export default function LinkCP({ href, children, ...props }: TLink) {
    return (
        <Link href={href}>
            <a {...props} className={styles.link}>
                {children}
            </a>
        </Link>
    )
}
