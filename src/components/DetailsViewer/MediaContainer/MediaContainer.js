import { Box, Grid, Tabs, Tab, Text } from 'grommet';
import { Disc, Group } from 'grommet-icons';

import ImageViewer from './ImageViewer';

export default function MediaContainer({
  searchData,
  detailsData,
  loading,
  error
}) {
  return (
    <Box pad="1rem" fill>
      <Grid
        fill
        gap="medium"
        areas={[
          {
            name: 'imageViewer',
            start: [0, 0],
            end: [0, 2]
          },
          {
            name: 'detailsPanel',
            start: [1, 0],
            end: [1, 1]
          },
          {
            name: 'socialLinks',
            start: [1, 2],
            end: [1, 2]
          }
        ]}
        rows={['auto', 'auto', 'auto']}
        columns={['1/2', '1/2']}
      >
        <Box gridArea="imageViewer">
          <ImageViewer
            initialImage={searchData.image.full}
            images={detailsData ? detailsData.images : null}
            loading={loading}
            error={error}
          />
        </Box>
        <Box gridArea="detailsPanel">
          <Tabs>
            <Tab title="Release">
              <Box>
                {Object.keys(searchData).map(key => {
                  return key === 'image' ? null : (
                    <Box key={key}>
                      <span>
                        <Text weight="bold">{key}: </Text>
                        <Text>{JSON.stringify(searchData[key])}</Text>
                      </span>
                    </Box>
                  );
                })}
              </Box>
            </Tab>
            <Tab title="Artist">
              <Box pad="medium">Artist description</Box>
            </Tab>
          </Tabs>
        </Box>
        <Box
          gridArea="socialLinks"
          background="neutral-3"
          justify="center"
          align="center"
        >
          socialLinks
        </Box>
      </Grid>
    </Box>
  );
}
