import HomeSearchCP from "../Search/HomeSearchCP";
import Link from 'next/link'
import { useState } from "react";
import ProjectNew from "../Project/ProjectNew";

export default function HomeHeaderCP({ username, filter }: { username: string, filter: (query: string) => void; }) {
    const [modalIsActivate, setmodalIsActivate] = useState(false);
    const closeModal = () => setmodalIsActivate(false);
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around'
        }}>
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
            <HomeSearchCP filter={filter} />
            <button onClick={() => { setmodalIsActivate(true) }}>
                <a style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <img src="add.png" alt="Add project" />
                    <p>Novo Projeto</p>
                </a>
            </button>
            {modalIsActivate && <ProjectNew closeModal={closeModal} />}
        </div>
    )
}
