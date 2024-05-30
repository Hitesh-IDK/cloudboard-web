import styles from "./overview-header.module.css";

export default function OverViewHeader(): JSX.Element {
  return (
    <div className={styles.overview__header}>
      <h2 className={styles.header__title}>CloudBoard Overview</h2>
    </div>
  );
}
