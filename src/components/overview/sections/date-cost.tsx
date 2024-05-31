import { useState } from "react";
import styles from "./date-cost.module.css";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

export default function DateCost() {
  const [fromDate, setFromDate] = useState<Date>(new Date());
  const [toDate, setToDate] = useState<Date>(new Date());

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
        <Stat>
          <StatLabel>Total Cost</StatLabel>
          <StatNumber>₹0.00</StatNumber>
          <StatHelpText>
            {fromMonth == toMonth && fromDateNum == toDateNum
              ? "Today"
              : `${fromMonth} ${fromDateNum} - ${toMonth} ${toDateNum}`}
          </StatHelpText>
        </Stat>
      </div>
    </>
  );
}
