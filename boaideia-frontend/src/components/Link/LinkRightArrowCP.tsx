import Link from 'next/link'
import React from 'react'
import styles from './Link.module.css'

type size = 'sm' | 'md' | 'lg'
export default function LinkRightArrowCP({ href, children, size }: { href: string, children: any, size: size }) {
    const fontSize = {
        'sm': '.8rem',
        'md': '1.4rem',
        'lg': '2rem'
    }
    return (
        <Link href={href}>
            <a className={styles.arrowLink} style={{
                fontSize: fontSize[size]
            }}>
                <span>
                    {children}
                </span>
                <img style={{
                    margin: "3px 0 0 6px"
                }} src="long-arrow.svg" alt="Long Arrow" />
            </a>
        </Link>
    )
}
