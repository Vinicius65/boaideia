import ProjectCardCP from "../../components/ProjectCard/ProjectCardCP";
import styles from './Project.module.css';

export default function index() {
    return (
        <div className={styles.container}>
            <ProjectCardCP />
            <ProjectCardCP />
            <ProjectCardCP />
            <ProjectCardCP />
            <ProjectCardCP />
        </div>
    )
}
