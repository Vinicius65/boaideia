import HomeSearchCP from "../Search/HomeSearchCP";
import Link from 'next/link'
import { useState } from "react";
import ProjectNew from "../Project/ProjectNew";

export default function HomeHeaderCP({ filter }: { filter: (query: string) => void; }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
        }}>

            <div style={{
                zIndex: 1
            }}>
                <HomeSearchCP filter={filter} />
            </div>

        </div>
    )
}
