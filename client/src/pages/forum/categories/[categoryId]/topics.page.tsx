import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Pages } from "../../../Pages";
import { useFindCategoryById } from "../../@common/categoriesApi";
import { TopicDrawer } from "./TopicDrawer";
import TopicsTable from "./TopicsTable";

export const Topics = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { categoryData } = useFindCategoryById(categoryId as string);

  return (
    <Pages>
      <TopicDrawer categoryId={categoryId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj temat
        </Button>
      </Flex>
      <TopicsTable category={categoryData} />
    </Pages>
  );
};

export default Topics;
