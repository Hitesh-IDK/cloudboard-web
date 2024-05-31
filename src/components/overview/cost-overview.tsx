import { useEffect, useState } from "react";
import SectionGap from "../common/section-gap";
import SectionTitle from "../common/section-title";
import styles from "./cost-overview.module.css";
import DateCost from "./sections/date-cost";
import ResourceList from "./sections/resource-list";
import GetCostUsage from "../../helpers/aws/getCostUsage";
import { AwsServiceData } from "../../helpers/aws/config";

export default function CostOverview(): JSX.Element {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [costData, setCostData] = useState<AwsServiceData[]>();

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted) return;

    GetCostUsage().then((data) => setCostData(data));
  }, [isMounted]);

  return (
    <div>
      <SectionGap />
      <SectionTitle title="Cost Overview" />

      <div className={styles.cost__container}>
        <div className={styles.cost__sub_container}>
          <DateCost costData={costData} />
        </div>
        <div className={styles.cost__sub_container}>
          <ResourceList costData={costData} />
        </div>
      </div>
    </div>
  );
}
