import React, { Component } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from "apollo-link-context";
import { ApolloProvider } from 'react-apollo';
import AppRoute from './routes';

const authLink = setContext((_, { headers }) => {
  const token = "xVy99wBbL08Z4lgyaB4_SRR04EPfRK2CKtCKAE_F47vZDaUtJnlVmxmYPxR2cfRIVuLkwQyjZInDWuFNSCNvXeF4iTcveMPugsJsDAeZRO6GCDla-t7ujHTuv77uXHYx";
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
      'accept-language': 'en_US'
    }
  }
});

const client = new ApolloClient({
  link: (authLink).concat(ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://api.yelp.com/v3/graphql',
      credentials: 'same-origin'
    })
  ])),
  cache: new InMemoryCache()
});


export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppRoute />
      </ApolloProvider>
    );
  }
}