import React from 'react';
import App, { Container } from 'next/app';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import { Grommet } from 'grommet';

import { createGlobalStyle } from 'styled-components';
import resolvers from '../apollo/resolvers';
import typeDefs from '../apollo/typeDefs';

const GlobalStyle = createGlobalStyle`
  * {
   box-sizing: border-box;
  }
  body, html {
    margin: 0;
    height: 100%;
  }
`;
const theme = {
  global: {
    font: {
      family: 'Roboto'
    }
  }
};

const cache = new InMemoryCache();

cache.writeData({
  data: {
    activeQuery: {
      query: '',
      genre: '',
      style: '',
      country: '',
      years: '',
      artist: '',
      page: 1,
      per_page: 100,
      __typename: 'SearchQuery'
    }
  }
});

// TODO: Monkey-patching in a fix for an open issue suggesting that
// `readQuery` should return null or undefined if the query is not yet in the
// cache: https://github.com/apollographql/apollo-feature-requests/issues/1
cache.originalReadQuery = cache.readQuery;
cache.readQuery = (...args) => {
  try {
    return cache.originalReadQuery(...args);
  } catch (err) {
    return undefined;
  }
};
// 'https://vmx-server.baumzeit.now.sh/graphql'

const client = new ApolloClient({
  cache,
  link: new HttpLink({
    fetch,
    uri: 'http://localhost:3000/graphql'
  }),
  typeDefs,
  resolvers
});

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    // pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={client}>
        <Container>
          <Grommet theme={theme}>
            <Component {...pageProps} />
          </Grommet>
          <GlobalStyle />
        </Container>
      </ApolloProvider>
    );
  }
}

export default CustomApp;
