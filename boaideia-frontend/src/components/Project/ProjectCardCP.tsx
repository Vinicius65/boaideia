import styles from "./Project.module.css";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ProjectDetailsCP from './ProjectDetailsCP'
import { TProject } from "../../types";

export default function ProjectCardCP({ project, style, ...props }: { project: TProject, style: {} }) {

    const Icon = project.isPrivate ? LockIcon : LockOpenIcon;
    const { username } = project?.userList.find(u => u.typePermission == "owner") || {username: "vinicius"};

    return (
        <div className={`${styles.container}`} style={style} {...props}>
            <div className={styles.header}>
                <div>
                    <h2>{project.name}</h2>
                    <div className={styles.owner}>
                        <AccountCircleIcon fontSize='small' />
                        <strong>{username}</strong>
                    </div>
                </div>  
                <Icon fontSize='small' />
            </div>
            <div className={styles.body}>
                <p className={styles.description}>
                    {project.description}
                </p>

                <div className={styles.date}>
                    <small>Data de início: <strong>{project.startDate.toLocaleDateString("pt-BR")}</strong></small>
                    <small>Data de fim: <strong>{project.endDate?.toLocaleDateString("pt-BR")}</strong></small>
                </div>

                <div className={styles.rank}>
                    <small>Rank: <strong>{project.relevanceRank.rank}</strong></small>
                    <small>Votação: <strong>{project.relevanceRank.numberOfVotation}</strong></small>
                </div>
            </div>
            <ProjectDetailsCP goalList={project.goalList} />
        </div>
    );
}
