import React, { useEffect, useState } from 'react';
import { withApollo } from 'react-apollo';
import DetailsDataContext from './context';

function DiscogsDataProvider({
  children,
  client,
  apollo: { options, typeName },
  load,
  ...props
}) {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(
    () => {
      // optimizing condition, careful with unintentional state traces
      if (!fetchedData) {
        const cacheResult = client.readQuery(options);
        setFetchedData(cacheResult ? cacheResult[typeName] : null);
      }
    },
    [client, fetchedData, options, typeName]
  );

  useEffect(
    () => {
      const fetchData = () => {
        return client.query(options);
      };

      if (!fetchedData && load) {
        fetchData().then(({ data }) => {
          setFetchedData(data[typeName]);
        });
      }
    },
    [client, fetchedData, load, options, typeName]
  );

  return (
    <DetailsDataContext.Provider value={{ data: fetchedData }}>
      {React.cloneElement(children, props)}
    </DetailsDataContext.Provider>
  );
}

export default withApollo(DiscogsDataProvider);
