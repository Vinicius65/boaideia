import Link from 'next/link'
import React from 'react'
import styles from './Link.module.css'

export default function LinkRightArrowCP({ href, children }: { href: string, children: any }) {
    return (
        <Link href={href}>
            <a className={styles.arrowLink}>
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
