import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import styles from "./tag-list.module.css";

export default function TagList(): JSX.Element {
  return (
    <div className={styles.list__container}>
      <h3 className={styles.list__title}>Tags</h3>
      <Tag
        size="lg"
        variant="solid"
        backgroundColor={"#47c7ce"}
        borderRadius={"full"}
      >
        <TagLabel>Label</TagLabel>
        <TagCloseButton />
      </Tag>
    </div>
  );
}
