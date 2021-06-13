import React from 'react'
import styles from './Button.module.css'

type TButton = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: any
}
export default function ButtonCP({ onClick, children }: TButton) {
    return (
        <button className={styles.button} onClick={onClick}>
            {children}
        </button>
    )
}
