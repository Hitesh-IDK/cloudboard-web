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
import { useEffect, useState } from "react";
import GetTags from "../../helpers/aws/getTags";

export default function TagList(): JSX.Element {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if (!isMounted) return;

    GetTags();
  }, [isMounted]);

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
