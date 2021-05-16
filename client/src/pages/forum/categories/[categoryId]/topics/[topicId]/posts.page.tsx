import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Pages } from '../../../../../Pages';
import { useFindTopicById } from '../../../../@common/forumApis';
import { PostDrawer } from './PostDrawer';

export const Posts = () => {
  const router = useRouter();
  const { topicId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { topicData } = useFindTopicById(topicId as string);

  return (
    <Pages>
      <PostDrawer topicId={topicId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj post
        </Button>
      </Flex>
      <Box>
        {topicData?.posts.map((post) => (
          <Box>{post.content}</Box>
        ))}
      </Box>
    </Pages>
  );
};

export default Posts;
