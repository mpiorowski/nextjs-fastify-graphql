import { Box, Grid } from '@chakra-ui/layout';
import { Center } from '@chakra-ui/react';
import { faComments, faHome, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { apiRequest } from '../@common/@apiRequest';
import { REST } from '../@common/@enums';
import { LoadingPage } from './@common/LoadingPage';

type Props = {
  children?: ReactElement | ReactElement[];
};

export function user() {
  return apiRequest<{ name: string }>({
    url: 'http://localhost:3000/auth/user',
    method: REST.GET,
  });
}

export function logout() {
  return apiRequest<{ name: string }>({
    url: 'http://localhost:3000/auth/logout',
    method: REST.POST,
  });
}

export const Pages = ({ children }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    user()
      .then((response) => {
        if (response.name && response.name === 'mat') {
          setLoading(false);
        } else {
          router.push('/login');
        }
      })
      .catch((error) => {
        console.error(error);
        router.push('/login');
      });
  }, []);

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  if (loading) {
    return <LoadingPage></LoadingPage>;
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
