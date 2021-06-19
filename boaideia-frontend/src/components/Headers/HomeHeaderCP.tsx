import HomeSearchCP from "../Search/HomeSearchCP";
import Link from 'next/link'

export default function HomeHeaderCP({ username }: { username: string }) {
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
                    Welcome {username}
                </p>
            </div>
            <HomeSearchCP />
            <Link href="/home/add">
                <a style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <img src="add.png" alt="Add project" />
                    <p>Add project</p>
                </a>
            </Link>
        </div>
    )
}
