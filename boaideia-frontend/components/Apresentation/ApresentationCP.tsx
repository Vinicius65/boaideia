import styles from './Apresentation.module.css';
import Image from 'next/image'


export default function ApresentationCP() {
    return (
        <>
            <section className={styles.marca}>
                <h1>goodIdea</h1>
                <Image
                    src="/streamline-icon-egg-idea.png"
                    alt="Picture of the author"
                    width={200}
                    height={200}
                />
                <h2>Dê vida a sua idéia</h2>
                <div style={{ margin: '2rem 0 5rem' }} className='line'></div>
            </section>
            <section className={styles.funcionalidades}>
                <div className={styles.containerImage}>
                    <div className={styles.image} >
                    </div>
                    <p>
                        Crie sua idéia e divulgue-a
                    </p>
                </div>


                <div className={styles.containerImage}>
                    <div className={styles.image}>
                    </div>
                    <p>
                        Encontre pessoas dispostas à ajudar
                    </p>
                </div>

                <div className={styles.containerImage}>
                    <div className={styles.image}>
                    </div>
                    <p>
                        Encontre pessoas dispostas à ajudar
                    </p>
                </div>

                <div className={styles.containerImage}>
                    <div className={styles.image}>
                    </div>
                    <p>
                        Encontre pessoas dispostas à ajudar
                    </p>
                </div>
            </section>
        </>
    )
}
