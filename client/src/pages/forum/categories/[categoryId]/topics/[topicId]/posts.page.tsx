import React from 'react';
import { Pages } from '../../../../../Pages';
import { Post, Topic } from '../../../../@common/forumTypes';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

export const Posts = () => {
  const router = useRouter();
  const { topicId } = router.query;
  return (
    <Pages>
      {/* <PostDrawer categoryId={categoryId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj temat
        </Button>
      </Flex> */}
      <Box>{topicId}</Box>
    </Pages>
  );
};

export default Posts;
