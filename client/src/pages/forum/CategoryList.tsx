import { Center, Grid, GridItem, WrapItem } from '@chakra-ui/layout';
import { Box, Button, Flex, HStack, Stack, useDisclosure, Wrap } from '@chakra-ui/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faComment, faPenAlt, fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useCategories } from './@common/forumApis';
import { CategoryDrawer } from './CategoryDrawer';

export const CategoryList = () => {
  const { data } = useCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  if (!data || !data.categories) {
    return <div></div>;
  }

  return (
    <Box>
      <Grid templateColumns="200px 1fr" h="100vh">
        <Box backgroundColor="gray.700">
          <Box p="4">
            <Button ref={btnRef} onClick={onOpen} w="100%">
              Dodaj kategorię
            </Button>
          </Box>
          <Grid direction="column" mt="10" borderBottom="1px solid gray">
            {data.categories.map((category) => (
              <Box _hover={{ backgroundColor: 'gray.500', cursor: 'pointer' }}>
                <Flex h="50px" borderTop="0.5px solid gray" alignItems="center" justifyContent="space-between" >
                  <Box pl="4">{category.title}</Box>
                  <Box pr="4">
                    12 <FontAwesomeIcon icon={faComment} />
                  </Box>
                </Flex>
                <Flex fontSize="x-small" pl="4">
                  Ostatni post: Wkrótce będę ...
                </Flex>
              </Box>
            ))}
          </Grid>
          {/* <Flex fontSize="26" alignItems="center">
            Kategorie
          </Flex> */}
        </Box>
      </Grid>
      <CategoryDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose}></CategoryDrawer>
    </Box>
  );
};
