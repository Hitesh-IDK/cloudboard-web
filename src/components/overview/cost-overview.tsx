import { useEffect, useState } from "react";
import SectionGap from "../common/section-gap";
import SectionTitle from "../common/section-title";
import styles from "./cost-overview.module.css";
import DateCost from "./sections/date-cost";
import ResourceList from "./sections/resource-list";
import GetCostUsage from "../../helpers/aws/getCostUsage";
import { AwsServiceData } from "../../helpers/aws/config";
import OverviewSubContainer from "../common/overview-subcontainer";
import OverviewContainer from "../common/overview-container";

export default function CostOverview(): JSX.Element {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [costData, setCostData] = useState<AwsServiceData[]>();

  const [refreshClicked, setRefreshClicked] = useState<boolean>(true);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted) return;

    if (refreshClicked) {
      GetCostUsage(fromDate, toDate).then((data) => {
        setCostData(data);
        console.log(data, fromDate, toDate);

        setRefreshClicked(false);
      });
    }
  }, [isMounted, refreshClicked]);

  return (
    <div>
      <SectionGap />
      <SectionTitle title="Cost Overview" />

      <OverviewContainer>
        <OverviewSubContainer>
          <DateCost
            costData={costData}
            refreshStates={{ refreshClicked, setRefreshClicked }}
            fromDateStates={{ fromDate, setFromDate }}
            toDateStates={{ toDate, setToDate }}
          />
        </OverviewSubContainer>

        <OverviewSubContainer>
          <ResourceList costData={costData} />
        </OverviewSubContainer>
      </OverviewContainer>
    </div>
  );
}
