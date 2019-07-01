import { useContext } from 'react';
import { Box, Grid, Tabs, Tab, Text } from 'grommet';
import { Close, Disc, Group } from 'grommet-icons';

import ImageViewer from './ImageViewer';
import IconWrapper from '../../IconWrapper';
import DataContext from '../DataProvider/context';

export default function MediaContainer({ close, ...props }) {
  const { detailsData, activeData } = useContext(DataContext);

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
            name: 'title',
            start: [1, 0],
            end: [1, 0]
          },
          {
            name: 'close',
            start: [2, 0],
            end: [2, 0]
          },
          {
            name: 'detailsPanel',
            start: [1, 1],
            end: [2, 1]
          },
          {
            name: 'socialLinks',
            start: [1, 2],
            end: [2, 2]
          }
        ]}
        rows={['auto', 'flex', 'auto']}
        columns={['flex', 'flex', 'auto']}
      >
        <Box gridArea="imageViewer">
          <ImageViewer activeData={activeData} detailsData={detailsData} />
        </Box>
        <Box gridArea="title">
          <Text>{activeData.title}</Text>
        </Box>
        <Box gridArea="close">
          <IconWrapper onClick={close} iconPad="0.5rem" highlightColor="black">
            <Close />
          </IconWrapper>
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
