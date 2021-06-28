import styles from "./Project.module.css";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProjectDetailsCP from './ProjectDetailsCP'
import { TProject } from "../../types";

export default function ProjectCardCP({ project, style, ...props }: { project: TProject, style: {} }) {

    const Icon = project.isPrivate ? LockIcon : LockOpenIcon;
    const { firstname, lastname } = project.userList[0];

    return (
        <div className={`${styles.container}`} style={style} {...props}>
            <div className={styles.header}>
                <div>
                    <h2>{project.name}</h2>
                    <div className={styles.owner}>
                        <AccountCircleIcon fontSize='small' />
                        <strong>{firstname} {lastname}</strong>
                    </div>
                </div>
                <Icon fontSize='small' />
            </div>
            <div className={styles.body}>
                <p className={styles.description}></p>

                <div className={styles.date}>
                    <small>Data de início: <strong>{project.startDate.toLocaleDateString("pt-BR")}</strong></small>
                    <small>Data de fim: <strong>{project.endDate.toLocaleDateString("pt-BR")}</strong></small>
                </div>

                <div className={styles.rank}>
                    <small>Rank: <strong>{project.rank}</strong></small>
                    <small>Votação: <strong>{project.numberOfVotation}</strong></small>
                </div>
            </div>
            <ProjectDetailsCP goalList={project.goalList} />
        </div>
    );
}
