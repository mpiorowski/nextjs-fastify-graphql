import { Box, Grid } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';
import { faComments, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { LoadingPage } from './LoadingPage';

type Props = {
  children?: ReactElement | ReactElement[];
};

export const Navigation = ({ children }: Props) => {
  const [session, loading] = useSession();
  const router = useRouter();

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }
  if (!session) {
    router.push('/api/auth/signin');
    return <LoadingPage></LoadingPage>;
  }

  const activeUrl = router.pathname.split('/')[1];
  return (
    <Grid gridTemplateColumns="60px 1fr" h="100vh">
      <Box backgroundColor="gray.900">
        <Link href="/home">
          <Center h="40px" _hover={{ color: 'gray.400', cursor: 'pointer' }} m="2" borderRadius="4" backgroundColor={activeUrl === 'home' && 'gray.600'}>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Center>
        </Link>
        <Link href="/forum/categories">
          <Center h="40px" _hover={{ color: 'gray.400', cursor: 'pointer' }} m="2" borderRadius="4" backgroundColor={activeUrl === 'forum' && 'gray.600'}>
            <FontAwesomeIcon icon={faComments} size="lg" />
          </Center>
        </Link>
        <Center h="40px" _hover={{ color: 'gray.400', cursor: 'pointer' }} m="2" borderRadius="4" onClick={() => signOut()}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </Center>
      </Box>
      <Box>{children}</Box>
    </Grid>
  );
};
