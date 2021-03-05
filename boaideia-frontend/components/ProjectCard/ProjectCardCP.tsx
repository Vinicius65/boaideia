import styles from "./ProjectCard.module.css";
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default function ProjectCardCP() {

    const isPrivate = true;
    const Icon = isPrivate ? LockIcon : LockOpenIcon;

    return (
        <div className={`${styles.container}`}>
            <div className={styles.header}>
                <div>
                    <h2>Project name</h2>
                    <div className={styles.owner}>
                        <AccountCircleIcon fontSize='small' />
                        <strong> Vinicius Siqueira</strong>
                    </div>
                </div>
                <Icon fontSize='small' />
            </div>
            <div className={styles.body}>
                <p className={styles.description}>Desse projeto tem como objetivo utilizar a inteligência artifical para modelar a interface de usuário comforme o uso. A própria interface recomendará mudanças de layout que podem beneficiar o usuário, fazendo com que cada interface seja personalizada por usuário</p>

                <div className={styles.date}>
                    <small>Data de início: <strong>25/11/1991</strong></small>
                    <small>Data de fim: <strong>25/12/1991</strong></small>
                </div>

                <div className={styles.rank}>
                    <small>Rank: <strong>5 Estrelas</strong></small>
                    <small>Votação: <strong>62.594</strong></small>
                </div>

            </div>
        </div>
    );
}
