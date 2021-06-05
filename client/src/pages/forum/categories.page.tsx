import { Box, Button, Flex, Grid, Link as UiLink, useDisclosure } from "@chakra-ui/react";
import { faComments, faPenAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { Fragment } from "react";
import { Pages } from "../Pages";
import { useFindAllCategories } from "./@common/categories.api";
import { CategoryDrawer } from "./CategoryDrawer";

export default function Categories(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { fetching, error, response } = useFindAllCategories();

  return (
    <Pages>
      <CategoryDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj kategorię
        </Button>
      </Flex>
      <Grid
        width="60%"
        margin="auto"
        marginTop="40px"
        gridTemplateColumns="1fr 200px"
        rowGap="0.5"
        paddingTop="0.5"
        paddingBottom="0.5"
        justifyContent="stretch"
        background="gray.500"
      >
        {response.map((category) => (
          <Fragment key={category.id}>
            <Grid h="100px" background="gray.800" alignContent="center">
              <Link href={`/forum/categories/${category.id}/topics`}>
                <UiLink fontSize="xl" color="green.400">
                  {category.title}
                </UiLink>
              </Link>
              <Box fontSize="sm" color="gray.300">
                {category.description}
              </Box>
            </Grid>
            <Grid background="gray.800" alignContent="center">
              <Box fontSize="large" color="gray.400">
                <FontAwesomeIcon icon={faComments} /> {category.postsCount || 0} posts
              </Box>
              <Box fontSize="large" color="gray.400">
                <FontAwesomeIcon icon={faPenAlt} /> {category.topics.length || 0} topics
              </Box>
            </Grid>
          </Fragment>
        ))}
      </Grid>
      {/* <Grid templateColumns="250px 1fr" h="100vh">
        <Box backgroundColor="gray.700">
          <Box p="4">
            <Button ref={btnRef} onClick={onOpen} w="100%">
              Dodaj kategorię
            </Button>
          </Box>
          <Grid direction="column" mt="10" backgroundColor="gray.500" rowGap="0.5" paddingTop="0.5" paddingBottom="0.5">
            {categories.map((category) => (
              <Grid
                key={category.id}
                onClick={() => setActiveCategory(category)}
                _hover={{ backgroundColor: "gray.600", cursor: "pointer" }}
                h="90px"
                width="250px"
                pl="6"
                backgroundColor={activeCategory?.id === category.id ? "gray.600" : "gray.700"}
                alignContent="center"
                justifyContent="space-between"
              >
                <Box fontSize="large" textOverflow="ellipsis" width="250px" whiteSpace="nowrap" overflow="clip">
                  {category.title}
                </Box>
                <Box fontSize="smaller" color="gray.400">
                  Liczba postów: {category.postsNumber || 0}
                </Box>
                <Box fontSize="smaller" color="gray.500">
                  Dzisiaj o 12:22
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        {activeCategory && <TopicsTable category={activeCategory}></TopicsTable>}
      </Grid> */}
    </Pages>
  );
}
