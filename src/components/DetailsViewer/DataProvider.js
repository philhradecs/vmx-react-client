import React, { useEffect, useState } from 'react';
import useIdle from 'react-use/lib/useIdle';
import { Query } from 'react-apollo';

import { GET_RELEASE_DETAILS } from '../../apollo/queries';

export default function DataProvider({ children, searchData, activeIndex }) {
  const isIdle = useIdle(200, false);

  const props = {
    detailsData: null,
    searchData: searchData[activeIndex],
    loading: null,
    error: null
  };

  return isIdle ? (
    <Query
      query={GET_RELEASE_DETAILS}
      variables={{ id: searchData[activeIndex].id }}
    >
      {({ data, loading, error, fetchMore }) => {
        const queryProps = {
          ...props,
          detailsData: data ? data.releaseDetails : null,
          loading,
          error
        };
        return React.cloneElement(children, queryProps);
      }}
    </Query>
  ) : (
    React.cloneElement(children, props)
  );
}
