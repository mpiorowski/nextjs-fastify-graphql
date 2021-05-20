import { Box, GridItem } from "@chakra-ui/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Grid,
} from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { Post } from "../../../../../../../../@types/forum.types";

interface Props {
  post: Post;
  onOpen: () => void;
  setReplyId: () => void;
}

export default function PostContent({ post, onOpen, setReplyId }: Props): ReactElement {
  return (
    <Grid background="gray.800" padding="30px 20px 30px 20px" gridTemplateColumns="auto 100px">
      <GridItem fontSize="xs" color="gray.400">
        <Box>Matuesz Piórowski - 2021-01-02 11:33:22</Box>
        <Box fontSize="lg" color="whiteAlpha.800">
          {post.content}
        </Box>
      </GridItem>
      <GridItem>
        <Button
          size="sm"
          onClick={() => {
            setReplyId();
            onOpen();
          }}
        >
          Odpowiedz
        </Button>
      </GridItem>
      {post.replies.length > 0 && (
        <GridItem colSpan={2} marginTop="20px">
          <Accordion allowMultiple colorScheme="blackAlpha">
            <AccordionItem border="none" width="100%">
              <h2>
                <AccordionButton width="120px" fontSize="14" p="2px" height="30px" color="whiteAlpha.800">
                  <Box flex="1" textAlign="left">
                    Odpowiedzi ({post.replies.length})
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel p={0} marginTop="20px" marginLeft="20px" width="100%">
                <Grid background="rgba(160, 155, 155, 0.329)" rowGap="0.5" paddingTop="0.5" paddingBottom="0.5">
                  {post.replies.map((reply) => (
                    <Box background="gray.800" padding="30px 20px 30px 20px">
                      <Box fontSize="xs" color="gray.400">
                        Matuesz Piórowski - 2021-01-02 11:33:22
                      </Box>
                      <Box fontSize="lg">
                        <Box>{reply.content}</Box>
                      </Box>
                    </Box>
                  ))}
                </Grid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </GridItem>
      )}
    </Grid>
  );
}
