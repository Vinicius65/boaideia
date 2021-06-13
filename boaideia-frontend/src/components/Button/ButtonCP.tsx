import React from 'react'


type TButton = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: any
}
export default function ButtonCP({ onClick, children }: TButton) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}
