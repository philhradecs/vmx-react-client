import { Box } from 'grommet';
import MediaContainer from './MediaContainer/MediaContainer';
import NavigationWrapper from './NavigationWrapper';

export default function DetailsViewer({ searchData, detailsID, close }) {
  const initialIndex = searchData.findIndex(entry => entry.id === detailsID);
  const maxIndex = searchData.length - 1;

  return (
    <Box
      width="1150px"
      height="650px"
      justify="center"
      align="center"
      overflow="hidden"
    >
      <NavigationWrapper
        fill
        initialIndex={initialIndex}
        maxIndex={maxIndex}
        direction="row"
        navWidth="80px"
      >
        <MediaContainer
          searchData={searchData}
          pad="1rem"
          background="white"
          fill
          round="10px"
        />
      </NavigationWrapper>
    </Box>
  );
}
