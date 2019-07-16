import Router from 'next/router';
import React from 'react';
import { Query } from 'react-apollo';
import DiscogsDataContext from './context';

function formatQueryForForm(queryParam) {
  const query = { ...queryParam };
  const { genre, style } = query;
  if (genre || style) {
    query.musicType = query.genre || query.style;
    delete query.genre;
    delete query.style;
  }
  return query;
}

function ApolloDataProvider({
  children,
  apolloOptions,
  typeName,
  load,
  additionalContext,
  loadingComponent
}) {
  return (
    <Query
      {...apolloOptions}
      fetchPolicy={load ? 'cache-first' : 'cache-only'}
      notifyOnNetworkStatusChange
    >
      {({ data, loading, error, variables }) => {
        if (loadingComponent && loading) return loadingComponent;

        const fetchedData = data ? data[typeName] : null;
        let hasMore = { next: false, prev: false };
        let fetchMoreData = {};

        if (fetchedData && Object.keys(fetchedData).includes('pagination')) {
          const { page, pages } = fetchedData.pagination;
          hasMore = { next: page !== pages, prev: page !== 1 };

          const query = formatQueryForForm(variables); // unify 'style' and 'genre' query parameter

          fetchMoreData = {
            prevPage() {
              return Router.push({
                pathname: '/explorer',
                query: { ...query, page: page - 1 }
              });
            },
            nextPage() {
              return Router.push({
                pathname: '/explorer',
                query: { ...query, page: page + 1 }
              });
            },
            page(num) {
              Router.push({
                pathname: '/explorer',
                query: { ...variables, page: num }
              });
            }
          };
        }

        return (
          <DiscogsDataContext.Provider
            value={{
              data: fetchedData,
              loading,
              error,
              variables,
              hasMore,
              fetchMoreData,
              ...additionalContext
            }}
          >
            {children}
          </DiscogsDataContext.Provider>
        );
      }}
    </Query>
  );
}

export default ApolloDataProvider;
