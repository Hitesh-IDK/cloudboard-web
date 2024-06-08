import { PropsWithChildren } from "react";
import styles from "./overview-container.module.css";

export default function OverviewContainer(props: PropsWithChildren) {
  return <div className={styles.cost__container}>{props.children}</div>;
}
