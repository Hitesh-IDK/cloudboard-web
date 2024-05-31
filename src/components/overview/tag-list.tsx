import {
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  TagRightIcon,
} from "@chakra-ui/react";
import styles from "./tag-list.module.css";
import { AddIcon } from "@chakra-ui/icons";
import SectionTitle from "../common/section-title";

export default function TagList(): JSX.Element {
  return (
    <div className={styles.list__container}>
      <SectionTitle title="Tags" />

      <HStack spacing={3}>
        <Tag
          size="lg"
          variant="solid"
          backgroundColor={"#47c7ce"}
          borderRadius={"full"}
          style={{ cursor: "pointer" }}
        >
          <TagLabel>Label</TagLabel>
          <TagCloseButton />
        </Tag>

        <Tag
          size={"lg"}
          variant="solid"
          borderRadius={"full"}
          style={{ cursor: "pointer" }}
        >
          <TagLabel>Label</TagLabel>
          <TagRightIcon
            boxSize="12px"
            as={AddIcon}
            style={{ cursor: "pointer" }}
          />
        </Tag>
      </HStack>
    </div>
  );
}
