import React from 'react'
import styles from './MainTitle.module.css'

export default function MainTitleCP({ children }: { children: any }) {
    return (
        <h1 className={styles.title}>
            {children}
        </h1>
    )
}
