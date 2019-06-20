import React from 'react';
import { Query } from 'react-apollo';

import { GET_RELEASE_DETAILS } from '../../apollo/queries';

export default function DataProvider({ children, searchData, activeIndex }) {
  return (
    <Query
      query={GET_RELEASE_DETAILS}
      variables={{ id: searchData[activeIndex].id }}
    >
      {({ data, loading, error, fetchMore }) => {
        const props = {
          detailsData: data ? data.releaseDetails : null,
          searchData: searchData[activeIndex],
          loading,
          error
        };
        return React.cloneElement(children, props);
      }}
    </Query>
  );
}
