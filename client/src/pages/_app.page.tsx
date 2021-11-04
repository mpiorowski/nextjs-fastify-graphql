import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient, defaultExchanges, Provider, subscriptionExchange } from "urql";
import { w3cwebsocket } from "websocket";
import "../styles/globals.css";

const subscriptionClient = new SubscriptionClient(
  `${process.env.NEXT_PUBLIC_CLIENT_WS}/api/subscriptions`,
  {
    reconnect: true,
  },
  w3cwebsocket,
);

const client = createClient({
  url: `${process.env.NEXT_PUBLIC_CLIENT_HTTP}/api/graphql`,
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
    <Provider value={client}>
      <QueryClientProvider client={queryClientRef.current}>
        <ChakraProvider>
          <ColorModeProvider
            options={{
              // useSystemColorMode: true,
              initialColorMode: "dark",
            }}
          >
            <Head>
              <title>NextJs with Fastify</title>
              <meta property="og:title" content="NextJs with Fastify" key="title" />
              <meta content="NextJs with Fastify using Graphql" name="description" key="description" />
            </Head>
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
