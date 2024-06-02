import { useEffect, useState } from "react";
import styles from "./date-cost.module.css";
import {
  Button,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AwsServiceData } from "../../../helpers/aws/config";

export interface DatecostProps {
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

export default function DateCost({
  costData,
  refreshStates,
  fromDateStates,
  toDateStates,
}: DatecostProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>(0);

  const { fromDate, setFromDate } = fromDateStates;
  const { toDate, setToDate } = toDateStates;

  const { refreshClicked, setRefreshClicked } = refreshStates;

  const fromDateHandler = (fromDate: Date) => {
    setFromDate(fromDate);
  };

  const toDateHandler = (toDate: Date) => {
    setToDate(toDate);
  };

  const fromMonth = fromDate.toDateString().split(" ")[1];
  const toMonth = toDate.toDateString().split(" ")[1];
  const fromDateNum = fromDate.toDateString().split(" ")[2];
  const toDateNum = toDate.toDateString().split(" ")[2];

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted) return;
    if (costData === undefined) return;

    setTotalCost(
      costData.reduce((acc, curr) => acc + (curr.cost ? curr.cost : 0), 0) *
        Number(process.env.REACT_APP_USDTOINR)
    );
  }, [costData, isMounted]);

  return (
    <>
      <div className={styles.cost__date_container}>
        <span className={styles.input__title}>From</span>
        <input
          type="date"
          className={styles.input__date}
          max={toDate.toISOString().split("T")[0]}
          value={fromDate.toISOString().substring(0, 10)}
          onChange={(e) => fromDateHandler(new Date(e.target.value))}
        />
      </div>
      <div className={styles.cost__date_container}>
        <span className={styles.input__title}>To</span>
        <input
          type="date"
          className={styles.input__date}
          min={fromDate.toISOString().split("T")[0]}
          max={new Date().toISOString().split("T")[0]}
          value={toDate.toISOString().substring(0, 10)}
          onChange={(e) => toDateHandler(new Date(e.target.value))}
        />
      </div>

      <div className={styles.cost__date_container}>
        {refreshClicked ? (
          <Button variant={"solid"} colorScheme="pink" isLoading>
            Refresh
          </Button>
        ) : (
          <Button
            variant={"solid"}
            colorScheme="pink"
            onClick={() => setRefreshClicked(true)}
          >
            Refresh
          </Button>
        )}
      </div>

      <div className={styles.cost__date_container}>
        {costData ? (
          <Stat>
            <StatLabel>Total Cost</StatLabel>
            <StatNumber>₹{totalCost.toFixed(2)}</StatNumber>
            <StatHelpText>
              {fromMonth === toMonth && fromDateNum === toDateNum
                ? "Today"
                : `${fromMonth} ${fromDateNum} - ${toMonth} ${toDateNum}`}
            </StatHelpText>
          </Stat>
        ) : (
          <div className={styles.cost__spinner}>
            <Spinner size={"lg"} color="#29b5bc" />
          </div>
        )}
      </div>
    </>
  );
}
