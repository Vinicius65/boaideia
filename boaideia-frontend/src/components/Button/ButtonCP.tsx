import React from 'react'
import styles from './Button.module.css'

type TButton = {
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: any,
    [props: string]: any
}
export default function ButtonCP({ onClick, children, ...props }: TButton) {
    return (
        <button className={styles.button} onClick={onClick} {...props}>
            {children}
        </button>
    )
}
