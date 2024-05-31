import { Spinner } from "@chakra-ui/react";
import { AwsServiceData } from "../../../helpers/aws/config";
import styles from "./resource-list.module.css";
import { useEffect, useState } from "react";

export default function ResourceList({
  costData,
}: {
  costData: AwsServiceData[] | undefined;
}) {
  const [resourceList, setResourceList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!costData) return;

    const listElements = costData.map((data) => {
      if (!data.cost) return <></>;

      return (
        <div className={styles.cost__resource_container}>
          <div className={styles.cost__resource_title}>{data.serviceName}</div>
          <div className={styles.cost__resource_cost}>
            ₹{(data.cost * Number(process.env.REACT_APP_USDTOINR)).toFixed(2)}
          </div>
        </div>
      );
    });
    setResourceList(listElements.splice(0, 4));
  }, [costData]);

  return (
    <>
      {costData ? (
        <>{resourceList}</>
      ) : (
        <div className={styles.resource__loader}>
          <Spinner size={"xl"} color="#29b5bc" thickness="4px" />
        </div>
      )}
    </>
  );
}
