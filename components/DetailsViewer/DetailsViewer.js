import { Box } from 'grommet';
import MediaContainer from './MediaContainer/MediaContainer';
import NavigationWrapper from './NavigationWrapper';
import DataProvider from './DataProvider/DataProvider';

export default function DetailsViewer({ searchData, detailsID, close }) {
  const initialIndex = searchData.findIndex(entry => entry.id === detailsID);
  const maxIndex = searchData.length - 1;

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
        <DataProvider searchData={searchData} queryDelay={250}>
          <MediaContainer
            pad="1rem"
            background="white"
            fill
            round="10px"
            close={close}
          />
        </DataProvider>
      </NavigationWrapper>
    </Box>
  );
}
