import styles from './ProjectCard.module.css';

export default function ProjectCardCP() {
    return (
        <div className={styles.containerCard}>
            <h2>
                Project name
            </h2>
            <p>Description...</p>
            <div className={styles.timeline}>
                <span>Start Date</span>
                <span>Expeted date</span>
            </div>

            <div>
                <span>Rank</span>
                <span>Votação</span>
            </div>
        </div>
    )
}
