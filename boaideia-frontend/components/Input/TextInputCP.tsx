import { type } from "os";
import React, { useState } from "react";
import styles from './TextInput.module.css'

type TProps = {
    style?: Object;
    label: string;
    name: string;
    value: string;
    onChange: (state: string) => void;
    type?: string;
};

export default function TextInputCP({
    style = {},
    label,
    name,
    value,
    onChange,
    type = 'text'
}: TProps) {
    const [erro, setErro] = useState(false);
    return (
        <div className={styles.container} style={style}>
            <label className={styles.label} htmlFor={name}>{label}</label>
            <input
                className={styles.input}
                name={name}
                id={name}
                type={type}
                value={value}
                onChange={({ target }) => onChange(target.value)}
            />
            {erro && <span>erro</span>}
        </div>
    );
}
