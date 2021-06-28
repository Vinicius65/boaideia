import styles from './Index.module.css';
import MainTitleCP from "../components/Titles/MainTitleCP";
import LinkRightArrowCP from '../components/Link/LinkRightArrowCP'
import Header from './struct/Header';
import Footer from './struct/Footer';

export default function Index() {
  return (
    <main className={styles.container}>
      <MainTitleCP>
        Inicie com a BoaIdéia
      </MainTitleCP>
      <div className={styles.startup}>
        <div className={styles.left}>
          <img src="apresentation.svg" alt="Apresentation" />
        </div>
        <div className={styles.right}>
          <p className={styles.text}>
            Ajude as pessoas a desenvolverem seus sonhos! Tire as boas ideias que só estão na cabeça para colocar em prática!

          </p>
          <LinkRightArrowCP href='register'>
            Comece gratuitamente
          </LinkRightArrowCP>
        </div>
      </div>
    </main >
  )
}
