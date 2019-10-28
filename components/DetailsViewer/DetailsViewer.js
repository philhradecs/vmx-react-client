import React from 'react';
import { Box } from 'grommet';

import { useTimeout } from 'react-use';
import MediaContainer from './MediaContainer/MediaContainer';
import NavigationWrapper from './NavigationWrapper';
import ApolloDataProvider from '../ApolloDataProvider/ApolloDataProvider';
import { GET_RELEASE_DETAILS } from '../../apollo/queries';
import { ActiveSearchDataContext } from './MediaContainer/context';

export default function DetailsViewer({ searchData, detailsID, close }) {
  const initialIndex = searchData.findIndex(entry => entry.id === detailsID);
  const maxIndex = searchData.length - 1;

  const NavigationConsumer = ({ children, activeIndex }) => {
    const delay = useTimeout(250);
    const activeData = searchData[activeIndex];
    return (
      <ApolloDataProvider
        apolloOptions={{
          variables: { id: activeData.id },
          query: GET_RELEASE_DETAILS
        }}
        typeName="releaseDetails"
        load={delay}
      >
        <ActiveSearchDataContext.Provider value={{ activeData }}>
          {children}
        </ActiveSearchDataContext.Provider>
      </ApolloDataProvider>
    );
  };

  return (
    <Box
      justify="center"
      align="center"
      overflow="hidden"
      width="1150px"
      height="600px"
    >
      <NavigationWrapper
        fill
        initialIndex={initialIndex}
        maxIndex={maxIndex}
        direction="row"
        navWidth="80px"
        gap="xsmall"
      >
        <NavigationConsumer>
          <MediaContainer
            pad="1rem"
            background="white"
            fill
            round="10px"
            close={close}
          />
        </NavigationConsumer>
      </NavigationWrapper>
    </Box>
  );
}
