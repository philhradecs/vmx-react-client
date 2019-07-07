import React from 'react';
import { Query } from 'react-apollo';
import DiscogsDataContext from './context';

function ApolloDataProvider({
  children,
  apolloOptions,
  typeName,
  load,
  additionalContext,
  paginationSupport
}) {
  return (
    <Query
      {...apolloOptions}
      fetchPolicy={load ? 'cache-first' : 'cache-only'}
      notifyOnNetworkStatusChange
    >
      {({ data, fetchMore, loading, error, variables }) => {
        const fetchedData = data ? data[typeName] : null;
        let fetchPage = { prev() {}, next() {} };

        if (paginationSupport && fetchedData) {
          const { page, pages } = fetchedData.pagination;
          const hasMore = { next: page !== pages, prev: page !== 1 };

          const updateQuery = (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;

            return {
              ...prev,
              [typeName]: {
                ...prev[typeName],
                pagination: {
                  ...prev[typeName].pagination,
                  page: fetchMoreResult[typeName].pagination.page
                },
                results: fetchMoreResult[typeName].results
              }
            };
          };

          fetchPage = {
            prev() {
              return hasMore.prev
                ? fetchMore({
                    variables: { ...variables, page: page - 1 },
                    updateQuery
                  })
                : {};
            },
            next() {
              return hasMore.next
                ? fetchMore({
                    variables: { ...variables, page: page + 1 },
                    updateQuery
                  })
                : {};
            }
          };
        }

        return (
          <DiscogsDataContext.Provider
            value={{
              data: fetchedData,
              fetchPage,
              loading,
              error,
              variables,
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
