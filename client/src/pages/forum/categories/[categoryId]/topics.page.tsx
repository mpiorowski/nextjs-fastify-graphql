import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Pages } from "../../../Pages";
import { useFindCategoryById } from "../../@common/categories.api";
import { TopicDrawer } from "./TopicDrawer";
import TopicsTable from "./TopicsTable";

export const Topics: React.FC = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { response } = useFindCategoryById(categoryId as string);

  return (
    <Pages>
      <TopicDrawer categoryId={categoryId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj temat
        </Button>
      </Flex>
      <TopicsTable category={response} />
    </Pages>
  );
};

export default Topics;
