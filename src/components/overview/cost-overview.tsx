import { DateRange, DayPicker } from "react-day-picker";
import SectionGap from "../common/section-gap";
import SectionTitle from "../common/section-title";
import styles from "./cost-overview.module.css";
import { useState } from "react";
import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";

export default function CostOverview(): JSX.Element {
  const initialRange: DateRange = {
    from: new Date(),
    to: new Date(),
  };
  const [range, setRange] = useState<DateRange | undefined>(initialRange);

  return (
    <div>
      <SectionGap />
      <SectionTitle title="Cost Overview" />

      <div className={styles.cost__container}>
        <div className={styles.cost__sub_container}>
          <div className={styles.cost__date_container}>
            <span className={styles.input__title}>From</span>
            <input
              type="date"
              className={styles.input__date}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className={styles.cost__date_container}>
            <span className={styles.input__title}>To</span>
            <input
              type="date"
              className={styles.input__date}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          <div className={styles.cost__date_container}>
            <Stat>
              <StatLabel>Total Cost</StatLabel>
              <StatNumber>₹0.00</StatNumber>
              <StatHelpText>Feb 12 - Feb 13</StatHelpText>
            </Stat>
          </div>
        </div>

        <div className={styles.cost__sub_container}>
          <div>To</div>
          <div>To</div>
        </div>
      </div>
    </div>
  );
}
