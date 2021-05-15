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
      <Box>{topicId}</Box>
    </Pages>
  );
};

export default Posts;
