import useTimeout from 'react-use/lib/useTimeout';
import React, { useState, useEffect } from 'react';
import { withApollo } from 'react-apollo';
import { GET_RELEASE_DETAILS } from '../../../apollo/queries';
import DataContext from './context';

function DataProvider({ children, client, searchData, queryDelay, ...props }) {
  const { activeIndex } = props;
  const activeData = searchData[activeIndex];
  const { id } = activeData;
  const loadDetails = useTimeout(queryDelay);
  const [detailsData, setDetailsData] = useState(null);

  useEffect(
    () => {
      const cacheResult = client.readQuery({
        query: GET_RELEASE_DETAILS,
        variables: { id }
      });
      setDetailsData(cacheResult ? cacheResult.releaseDetails : null);
    },
    [client, id]
  );

  useEffect(
    () => {
      const fetchDetails = () => {
        return client.query({
          query: GET_RELEASE_DETAILS,
          variables: { id }
        });
      };

      if (!detailsData && loadDetails) {
        fetchDetails().then(({ data }) => {
          setDetailsData(data.releaseDetails);
        });
      }
    },
    [client, detailsData, id, loadDetails]
  );

  return (
    <DataContext.Provider value={{ searchData, detailsData, activeData }}>
      {React.cloneElement(children, props)}
    </DataContext.Provider>
  );
}

export default withApollo(DataProvider);
