import React from 'react';
import App, { Container } from 'next/app';
import { ApolloClient, InMemoryCache, HttpLink, gql } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import { Grommet } from 'grommet';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
   box-sizing: border-box
  }
  body {
    margin: 0
  }
`;

// TODO: test if global theme apllies
const theme = {
  global: {
    margin: 0,
    font: {
      family: 'Roboto'
    }
  }
};

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link: new HttpLink({
    fetch,
    uri: 'http://localhost:4000/'
  })
});

class CustomApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
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
