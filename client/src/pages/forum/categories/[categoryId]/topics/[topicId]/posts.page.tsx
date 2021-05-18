import { Box, Button, Flex, Grid, useDisclosure } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Pages } from '../../../../../Pages';
import { useFindTopicById } from '../../../../@common/forumApis';
import PostContent from './PostContent';
import { PostDrawer } from './PostDrawer';

export const Posts = () => {
  const router = useRouter();
  const { topicId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [replyId, setReplyId] = useState<string | null>(null);

  const { topicData } = useFindTopicById(topicId as string);

  const handleClose = () => {
    setReplyId(null);
    onClose();
  };

  return (
    <Pages>
      <PostDrawer topicId={topicId as string} btnRef={btnRef} isOpen={isOpen} onClose={handleClose} replyId={replyId} />
      <Flex justifyContent="right" p="5">
        <Button ref={btnRef} onClick={onOpen} w="200px">
          Dodaj post
        </Button>
      </Flex>
      <Grid width="80%" margin="auto" marginTop="40px" background="rgba(160, 155, 155, 0.329)" rowGap="0.5" paddingTop="0.5" paddingBottom="0.5">
        {topicData?.posts.map((post) => (
          <PostContent content={post.content} onOpen={onOpen} setReplyId={() => setReplyId(post.id)} />
        ))}
      </Grid>
    </Pages>
  );
};

export default Posts;
