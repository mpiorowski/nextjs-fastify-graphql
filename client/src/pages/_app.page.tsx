import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import 'antd/dist/antd.css';
import { Provider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Hydrate } from 'react-query/hydration';
import '../styles/globals.css';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClientRef = React.useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: {
          refetchInterval: false,
          refetchOnWindowFocus: false,
        },
      },
    });
  }
  return (
    <Provider session={pageProps.session}>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider>
            <ColorModeProvider
              options={{
                // useSystemColorMode: true,
                initialColorMode: "dark"
              }}
            >
              <Component {...pageProps} />
            </ColorModeProvider>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
