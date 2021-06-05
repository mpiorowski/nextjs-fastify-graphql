import { Button, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Pages } from "../../../../../Pages";
import { useFindTopicById } from "../../../../@common/topics.api";
import PostContent from "./PostContent";
import { PostDrawer } from "./PostDrawer";

export const Posts: React.FC = () => {
  const router = useRouter();
  const { topicId } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const [replyId, setReplyId] = useState<string | null>(null);

  const { response } = useFindTopicById(topicId as string);

  return (
    <Pages>
      <PostDrawer topicId={topicId as string} btnRef={btnRef} isOpen={isOpen} onClose={onClose} replyId={replyId} />
      <Flex justifyContent="right" p="5">
        <Button
          ref={btnRef}
          onClick={() => {
            setReplyId(null);
            onOpen();
          }}
          w="200px"
        >
          Dodaj post
        </Button>
      </Flex>
      <Grid
        width="80%"
        margin="auto"
        marginTop="40px"
        background="rgba(160, 155, 155, 0.329)"
        rowGap="0.5"
        paddingTop="0.5"
        paddingBottom="0.5"
      >
        {response?.posts?.map((post) => (
          <PostContent post={post} onOpen={onOpen} setReplyId={() => setReplyId(post.id)} />
        ))}
      </Grid>
    </Pages>
  );
};

export default Posts;
