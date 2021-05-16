import { Box, Button, Flex, Grid, Link as UiLink, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { Pages } from '../Pages';
import { useFindAllCategories } from './@common/forumApis';
import { CategoryDrawer } from './CategoryDrawer';

export default function Categories() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { categoryData } = useFindAllCategories();
  return (
    <Pages>
      <CategoryDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj kategorię
        </Button>
      </Flex>
      <Grid maxWidth="1000px" margin="auto" marginTop="40px" rowGap="0.5" paddingTop="0.5" paddingBottom="0.5" justifyContent="stretch" background="gray.500">
        {categoryData.map((category) => (
          <Grid h="100px" background="gray.800" alignContent="center" key={category.id}>
            <Link href={`/forum/categories/${category.id}/topics`}>
              <UiLink fontSize="xl" color="green.400">
                {category.title}
              </UiLink>
            </Link>
            <Box fontSize="sm" color="gray.300">
              {category.description}
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* <Grid templateColumns="200px 1fr" h="100vh">
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
          <Flex fontSize="26" alignItems="center">
            Kategorie
          </Flex>
        </Box>
      </Grid> */}
    </Pages>
  );
}
