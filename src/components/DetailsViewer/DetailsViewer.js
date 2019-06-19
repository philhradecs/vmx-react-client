import { Box } from 'grommet';
import MediaContainer from './MediaContainer';
import NavigationContainer from './NavigationContainer';

export default function DetailsViewer({ data, detailsID }) {
  const initialIndex = data.findIndex(entry => entry.id === detailsID);

  return (
    <Box
      width="1050px"
      height="550px"
      justify="center"
      align="center"
      round="18px"
      overflow="hidden"
    >
      <NavigationContainer
        fill
        initialIndex={initialIndex}
        data={data}
        direction="row"
        navWidth="40px"
      >
        <MediaContainer />
      </NavigationContainer>
    </Box>
  );
}
