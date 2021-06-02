import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { createClient, defaultExchanges, Provider, subscriptionExchange } from "urql";
import { w3cwebsocket } from "websocket";
import "../styles/globals.css";

const subscriptionClient = new SubscriptionClient("ws://localhost:4000/graphql", { reconnect: true }, w3cwebsocket);

const client = createClient({
  url: "/api",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription(operation) {
        return subscriptionClient.request(operation);
      },
    }),
  ],
});

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
    <Provider value={client}>
      <QueryClientProvider client={queryClientRef.current}>
        <ChakraProvider>
          <ColorModeProvider
            options={{
              // useSystemColorMode: true,
              initialColorMode: "dark",
            }}
          >
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
