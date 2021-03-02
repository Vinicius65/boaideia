import styles from './Loading.module.css';
import { useContext } from 'react'
import { ApiContext } from '../../services/context/apiContext'

export default function LoadingCP({ size = 30, style = {} }: { size?: number, style?: {} }) {
    const { api } = useContext(ApiContext)
    const animationStyle = { ...style, fontSize: size };
    const voidStyle = { ...style, wdith: size, height: size };


    if (!api.loading) {
        return (
            <div style={voidStyle}></div>
        )
    }
    return (
        <div className={styles.loader} style={animationStyle}>Loading...</div>
    )
}
