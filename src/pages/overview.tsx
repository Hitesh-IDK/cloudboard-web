import { Divider } from "@chakra-ui/react";
import OverViewHeader from "../components/overview/overview-header";
import TagList from "../components/overview/tag-list";
import styles from "./overview.module.css";
import CostOverview from "../components/overview/cost-overview";
import UsageOverview from "../components/overview/usage-overview";
import { useEffect, useState } from "react";
import GetCostUsage from "../helpers/aws/getCostUsage";
import { AwsServiceData, AwsServiceUsage } from "../helpers/aws/config";

export default function Overview() {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [refreshClicked, setRefreshClicked] = useState<boolean>(true);

  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  const [costData, setCostData] = useState<AwsServiceData[]>();
  const [usageData, setUsageData] = useState<AwsServiceUsage[]>();

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted) return;

    if (refreshClicked) {
      GetCostUsage(fromDate, toDate).then((data) => {
        setCostData(data?.services);
        setUsageData(data?.serviceUsage);
        console.log(data, fromDate, toDate);

        setRefreshClicked(false);
      });
    }
  }, [isMounted, refreshClicked]);

  return (
    <>
      <div className={styles.overview__body}>
        <div className={styles.overview__container}>
          <OverViewHeader />

          <div className={styles.overview__content}>
            <TagList />
            <Divider />
            <CostOverview
              costData={costData}
              refreshStates={{ refreshClicked, setRefreshClicked }}
              fromDateStates={{ fromDate, setFromDate }}
              toDateStates={{ toDate, setToDate }}
            />
            <UsageOverview usageData={usageData} />
          </div>
        </div>
      </div>
    </>
  );
}
