import { createStandaloneToast } from '@chakra-ui/react';

export function errorHandler(error: Record<string, string>) {
  const toast = createStandaloneToast();
  toast({
    title: error.message,
    status: 'error',
    duration: 2000,
    isClosable: true,
    position: 'top-right',
  });
}
