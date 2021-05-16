import { Box, Grid } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';
import { faComments, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { apiRequest } from '../@common/@apiRequest';
import { LoadingPage } from './@common/LoadingPage';

type Props = {
  children?: ReactElement | ReactElement[];
};

export function findActiveUser() {
  return apiRequest<{ name: string }>({
    url: 'http://localhost:3000/auth/user',
    method: 'GET',
  });
}

export function logout() {
  return apiRequest<{ name: string }>({
    url: 'http://localhost:3000/auth/logout',
    method: 'POST',
    body: JSON.stringify({}),
  });
}

export const Pages = ({ children }: Props) => {
  const router = useRouter();

  const { data, isLoading } = useQuery('activeUser', findActiveUser);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!data?.name) {
    router.push('/login');
    return <LoadingPage></LoadingPage>;
  }

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  const activeUrl = router.pathname.split('/')[1];
  return (
    <Grid gridTemplateColumns="60px 1fr" h="100vh">
      <Box backgroundColor="gray.900">
        <Link href="/">
          <Center h="40px" _hover={{ color: 'gray.400', cursor: 'pointer' }} m="2" borderRadius="4" backgroundColor={activeUrl === '' && 'gray.600'}>
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Center>
        </Link>
        <Link href="/forum/categories">
          <Center h="40px" _hover={{ color: 'gray.400', cursor: 'pointer' }} m="2" borderRadius="4" backgroundColor={activeUrl === 'forum' && 'gray.600'}>
            <FontAwesomeIcon icon={faComments} size="lg" />
          </Center>
        </Link>
        <Center h="40px" _hover={{ color: 'gray.400', cursor: 'pointer' }} m="2" borderRadius="4" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
        </Center>
      </Box>
      <Box>{children}</Box>
    </Grid>
  );
};
