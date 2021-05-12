import { Center, Grid } from '@chakra-ui/layout';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPenAlt, fas } from '@fortawesome/free-solid-svg-icons';
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
    <Box p="8">
      <Grid templateColumns="1fr 300px">
        <Flex fontSize="26" alignItems="center">
          Kategorie
        </Flex>
        <Button ref={btnRef} onClick={onOpen}>
          Dodaj kategorię
        </Button>
      </Grid>
      <CategoryDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose}></CategoryDrawer>
    </Box>
  );
};
