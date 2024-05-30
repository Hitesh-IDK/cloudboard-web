import styles from "./section-title.module.css";

export default function SectionTitle({
  title,
}: {
  title: string;
}): JSX.Element {
  return <h3 className={styles.title}>{title}</h3>;
}
