import { Box } from 'grommet';
import MediaContainer from './MediaContainer/MediaContainer';
import NavigationWrapper from './NavigationWrapper';
import DataProvider from './DataProvider';

export default function DetailsViewer({ searchData, detailsID }) {
  const initialIndex = searchData.findIndex(entry => entry.id === detailsID);
  const maxIndex = searchData.length - 1;

  return (
    <Box
      width="1050px"
      height="550px"
      justify="center"
      align="center"
      round="18px"
      overflow="hidden"
    >
      <NavigationWrapper
        fill
        initialIndex={initialIndex}
        maxIndex={maxIndex}
        direction="row"
        navWidth="40px"
      >
        <DataProvider searchData={searchData}>
          <MediaContainer />
        </DataProvider>
      </NavigationWrapper>
    </Box>
  );
}
