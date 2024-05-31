import SectionGap from "../common/section-gap";
import SectionTitle from "../common/section-title";
import styles from "./cost-overview.module.css";
import DateCost from "./sections/date-cost";

export default function CostOverview(): JSX.Element {
  return (
    <div>
      <SectionGap />
      <SectionTitle title="Cost Overview" />

      <div className={styles.cost__container}>
        <div className={styles.cost__sub_container}>
          <DateCost />
        </div>
        <div className={styles.cost__sub_container}>
          <div className={styles.cost__resource_container}>
            <div className={styles.cost__resource_title}>AWS EC2 Resouce</div>
            <div className={styles.cost__resource_cost}>₹0.00</div>
          </div>
          <div className={styles.cost__resource_container}>
            <div className={styles.cost__resource_title}>AWS EC2 Resouce</div>
            <div className={styles.cost__resource_cost}>₹0.00</div>
          </div>
          <div className={styles.cost__resource_container}>
            <div className={styles.cost__resource_title}>AWS EC2 Resouce</div>
            <div className={styles.cost__resource_cost}>₹0.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
