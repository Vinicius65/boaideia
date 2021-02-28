import styles from './Apresentation.module.css';
import Image from 'next/image'


export default function ApresentationCP() {
    return (
        <section className={styles.marca}>
            <h1>goodIdea</h1>
            <Image
                src="/streamline-icon-egg-idea.png"
                alt="Picture of the author"
                width={200}
                height={200}
            />
        </section>
    )
}
