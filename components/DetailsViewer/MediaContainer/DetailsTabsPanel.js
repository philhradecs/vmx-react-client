import React, { useContext, useState } from 'react';
import { Box, Tab, Text, Heading } from 'grommet';

import { Disc, Group } from 'grommet-icons';
import ApolloDataContext from '../../ApolloDataProvider/context';
import ArtistDetails from './ArtistDetails';
import ApolloDataProvider from '../../ApolloDataProvider/ApolloDataProvider';
import { GET_ARTIST_DETAILS } from '../../../apollo/queries';
import { StyledTabs } from './StyledMediaContainerComponents';
import ReleaseDetails from './ReleaseDetails';
import LoadingArtistDetails from './LoadingArtistDetails';

export default function DetailsTabsPanel() {
  const [activeIndex, setActivIndex] = useState(0);
  const { releaseDetails } = useContext(ApolloDataContext);

  const styledIcon = (icon, tabIndex) => {
    const isActive = activeIndex === tabIndex;
    return (
      <Box
        background={isActive ? 'brand' : 'white'}
        round="3px"
        align="center"
        justify="center"
        pad="0.3rem"
      >
        {React.cloneElement(icon, {
          color: isActive ? 'white' : 'brand'
        })}
      </Box>
    );
  };

  return (
    <StyledTabs activeIndex={activeIndex} onActive={tab => setActivIndex(tab)}>
      <Tab plain title={styledIcon(<Disc />, 0)}>
        <ReleaseDetails />
      </Tab>
      <Tab plain title={styledIcon(<Group />, 1)}>
        {releaseDetails ? (
          <ApolloDataProvider
            apolloOptions={{
              query: GET_ARTIST_DETAILS,
              variables: { id: releaseDetails.artists[0].id }
            }}
            typeName="artistDetails"
            loadingComponent={<LoadingArtistDetails />}
            load
          >
            <ArtistDetails />
          </ApolloDataProvider>
        ) : (
          <LoadingArtistDetails />
        )}
      </Tab>
    </StyledTabs>
  );
}
