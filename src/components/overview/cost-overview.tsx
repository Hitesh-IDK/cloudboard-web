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

export interface CostOverviewProps {
  costData: AwsServiceData[] | undefined;
  refreshStates: {
    refreshClicked: boolean;
    setRefreshClicked: React.Dispatch<React.SetStateAction<boolean>>;
  };
  fromDateStates: {
    fromDate: Date;
    setFromDate: React.Dispatch<React.SetStateAction<Date>>;
  };
  toDateStates: {
    toDate: Date;
    setToDate: React.Dispatch<React.SetStateAction<Date>>;
  };
}

export default function CostOverview(props: CostOverviewProps): JSX.Element {
  const {
    costData,
    refreshStates: { refreshClicked, setRefreshClicked },
    fromDateStates: { fromDate, setFromDate },
    toDateStates: { toDate, setToDate },
  } = props;

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
