import { Box, GridItem } from '@chakra-ui/layout';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Button, Grid } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import { Post } from '../../../../@common/forumTypes';

interface Props {
  post: Post;
  onOpen: () => void;
  setReplyId: () => void;
}

export default function PostContent({ post, onOpen, setReplyId }: Props): ReactElement {
  return (
    <Grid background="gray.800" padding="20px">
      <GridItem fontSize="xs" color="gray.400">
        Matuesz Piórowski - 2021-01-02 11:33:22
      </GridItem>
      <GridItem fontSize="lg">
        <Box marginBottom="20px">{post.content}</Box>
        <Box>
          <Accordion allowMultiple colorScheme="blackAlpha" justifyContent="space-between" display="flex">
            <AccordionItem border="none">
              <AccordionButton width="100px" fontSize="14" p="2px" height="32px">
                <Box flex="1" textAlign="left">
                  Odpowiedzi
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel p={0} paddingLeft="40px" marginTop="20px">
                <Grid background="gray.800">
                  {post.replies.map((reply) => (
                    <>
                      <GridItem fontSize="xs" color="gray.400">
                        Matuesz Piórowski - 2021-01-02 11:33:22
                      </GridItem>
                      <GridItem fontSize="lg">
                        <Box>{reply.content}</Box>
                      </GridItem>
                    </>
                  ))}
                </Grid>
              </AccordionPanel>
            </AccordionItem>

            <Button
              size="sm"
              onClick={() => {
                setReplyId();
                onOpen();
              }}
            >
              Odpowiedz
            </Button>
          </Accordion>
        </Box>
      </GridItem>
    </Grid>
  );
}
