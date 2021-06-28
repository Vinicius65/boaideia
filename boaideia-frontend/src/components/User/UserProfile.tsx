import React from 'react'

export default function UserProfile({ username }: { username: string }) {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        }}>
            <img src="user.png" alt="User image" />
            <p>
                Bem vindo {username}
            </p>
        </div>
    )
}
