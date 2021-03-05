import styles from './Loading.module.css';

export default function LoadingCP({ loading, size = 30, style = {} }: { loading: boolean, size?: number, style?: {} }) {
    const animationStyle = { ...style, fontSize: size };
    const voidStyle = { ...style, wdith: size, height: size };

    if (!loading) {
        return (
            <div style={voidStyle}></div>
        )
    }
    return (
        <div className={styles.loader} style={animationStyle}>Loading...</div>
    )
}
