import { useEffect, useState } from "react";
import styles from "./date-cost.module.css";
import {
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { AwsServiceData } from "../../../helpers/aws/config";

export default function DateCost({
  costData,
}: {
  costData: AwsServiceData[] | undefined;
}) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());
  const [totalCost, setTotalCost] = useState<number>(0);

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
