import Header from "./struct/Header";
import styles from './Index.module.css';
import MainTitleCP from "../components/Titles/MainTitleCP";
import LinkRightArrowCP from '../components/Link/LinkRightArrowCP'

export default function Home() {
  return (
    <main className={styles.container}>
      <MainTitleCP>
        Get started with  BoaIdeia
      </MainTitleCP>
      <div className={styles.containerCenter}>
        <div className={styles.left}>
          <img src="apresentation.svg" alt="Apresentation" />
        </div>
        <div className={styles.right}>
          <p className={styles.text}>
            Help people to develop their dreams! Take away the good ideas that are only in the head to put into practice!
          </p>
          <LinkRightArrowCP href='register'>
            Start Free
          </LinkRightArrowCP>
        </div>
      </div>
    </main >
  )
}
