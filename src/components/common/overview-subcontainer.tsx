import { PropsWithChildren } from "react";
import styles from "./overview-container.module.css";

export default function OverviewSubContainer(props: PropsWithChildren) {
  return <div className={styles.cost__sub_container}>{props.children}</div>;
}
