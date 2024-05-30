import Headers from "../components/login/header";
import OverViewHeader from "../components/overview/overview-header";
import styles from "./overview.module.css";

export default function Overview() {
  return (
    <>
      <div className={styles.overview__body}>
        <div className={styles.overview__container}>
          <OverViewHeader />

          <div>adad</div>
        </div>
      </div>
    </>
  );
}
