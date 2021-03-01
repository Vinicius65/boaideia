import styles from './Button.module.css'

type TButtonProps = {
    variant?: 'primary' | 'outlined';
    [others: string]: any
}

export default function ButtonCP({ children, variant = 'primary', ...props }: TButtonProps) {
    const dictButtonStyle = {
        'primary': styles.buttonPrimary,
        'outlined': styles.buttonOutlined,
    }

    return (
        <button
            className={`${styles.button} ${dictButtonStyle[variant]}`}
            {...props}>
            {children}
        </button>
    )
}
