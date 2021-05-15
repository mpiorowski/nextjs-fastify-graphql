import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchInterval: false,
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    });
  }
  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <ColorModeProvider
            options={{
              // useSystemColorMode: true,
              initialColorMode: 'dark',
            }}
          >
            <CookiesProvider>
              <Component {...pageProps} />
            </CookiesProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
