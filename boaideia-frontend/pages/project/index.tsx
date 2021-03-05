import ProjectCardCP from "../../components/ProjectCard/ProjectCardCP";
import styles from './Project.module.css';
import getInitialProps from "../redirect";

const index = () => {
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

index.getInitialProps = getInitialProps;
export default index;