import { useState, useEffect } from 'react';
import { Box, Grid, Tabs, Tab, Text } from 'grommet';
import { Disc, Group } from 'grommet-icons';

import ImageViewer from './ImageViewer';

export default function MediaContainer({ searchData, activeIndex, ...props }) {
  const activeData = searchData[activeIndex];

  return (
    <Box {...props}>
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
        columns={['2/4', '2/4']}
      >
        <Box gridArea="imageViewer">
          <ImageViewer activeData={activeData} />
        </Box>
        <Box gridArea="detailsPanel">
          <Tabs>
            <Tab title="Release">
              <Box>
                {Object.keys(activeData).map(key => {
                  return key === 'image' ? null : (
                    <Box key={key}>
                      <span>
                        <Text weight="bold">{key}: </Text>
                        <Text>{JSON.stringify(activeData[key])}</Text>
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
          fill
        >
          socialLinks
        </Box>
      </Grid>
    </Box>
  );
}
