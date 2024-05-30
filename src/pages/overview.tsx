import { Divider } from "@chakra-ui/react";
import Headers from "../components/login/header";
import OverViewHeader from "../components/overview/overview-header";
import TagList from "../components/overview/tag-list";
import styles from "./overview.module.css";
import CostOverview from "../components/overview/cost-overview";

export default function Overview() {
  return (
    <>
      <div className={styles.overview__body}>
        <div className={styles.overview__container}>
          <OverViewHeader />

          <div className={styles.overview__content}>
            <TagList />
            <Divider />
            <CostOverview />
          </div>
        </div>
      </div>
    </>
  );
}
