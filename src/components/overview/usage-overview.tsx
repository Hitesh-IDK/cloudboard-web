import { AxisOptions, Chart, Series } from "react-charts";
import OverviewContainer from "../common/overview-container";
import OverviewSubContainer from "../common/overview-subcontainer";
import SectionGap from "../common/section-gap";
import SectionTitle from "../common/section-title";
import React, { useState } from "react";
import { AwsServiceUsage } from "../../helpers/aws/config";

type UsageData = {
  date: Date;
  value: number;
};

type series = {
  label: string;
  data: UsageData[];
};

interface UsageOverviewProps {
  usageData: AwsServiceUsage[] | undefined;
}

export default function UsageOverview(props: UsageOverviewProps) {
  const { usageData } = props;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const data: UsageData[] = [
    { date: new Date(Date.now() - 86400000), value: 400 },
    { date: new Date(), value: 300 },
  ];

  const series: series[] = [
    {
      label: "Usage",
      data: [
        { date: new Date(Date.now() - 86400000), value: 400 },
        { date: new Date(), value: 300 },
      ],
    },

    {
      label: "Cost",
      data: [
        { date: new Date(Date.now() - 86400000), value: 400 },
        { date: new Date(), value: 600 },
      ],
    },
  ];

  const primaryAxis = React.useMemo(
    (): AxisOptions<UsageData> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<UsageData>[] => [
      {
        getValue: (datum) => datum.value,
      },
    ],
    []
  );

  return (
    <div>
      <SectionGap />
      <SectionTitle title="Usage Overview" />

      <OverviewContainer>
        <OverviewSubContainer>
          <Chart options={{ data: series, primaryAxis, secondaryAxes }} />
        </OverviewSubContainer>
      </OverviewContainer>
    </div>
  );
}
