import Headers from "../components/login/header";
import OverViewHeader from "../components/overview/overview-header";
import TagList from "../components/overview/tag-list";
import styles from "./overview.module.css";

export default function Overview() {
  return (
    <>
      <div className={styles.overview__body}>
        <div className={styles.overview__container}>
          <OverViewHeader />

          <div className={styles.overview__content}>
            <TagList />
          </div>
        </div>
      </div>
    </>
  );
}
