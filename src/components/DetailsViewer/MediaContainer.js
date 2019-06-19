import { Box, Grid, Image, Tabs, Tab, Text } from 'grommet';
import { Disc, Group } from 'grommet-icons';
import Ratio from 'react-ratio';

export default function MediaContainer({ data }) {
  return (
    <Box pad="1rem" fill>
      <Grid
        fill
        gap="medium"
        areas={[
          {
            name: 'imageLarge',
            start: [0, 0],
            end: [0, 0]
          },
          {
            name: 'imageSelector',
            start: [0, 1],
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
        rows={['450px', 'auto', 'auto']}
        columns={['450px', 'flex']}
      >
        <Box gridArea="imageLarge" round="7px" overflow="hidden">
          <Ratio>
            <Image
              src={data.image.full}
              fallback="https://s3.amazonaws.com/detroitpubliclibrary/assets/images/material-cd.jpg"
              fit="cover"
              width="100%"
              height="100%"
            />
          </Ratio>
        </Box>
        <Box
          gridArea="imageSelector"
          background="neutral-4"
          justify="center"
          align="center"
        >
          imageSelector
        </Box>
        <Box gridArea="detailsPanel">
          <Tabs>
            <Tab title="Release">
              <Box>
                {Object.keys(data).map(key => {
                  return key === 'image' ? null : (
                    <Box key={key}>
                      <span>
                        <Text weight="bold">{key}: </Text>
                        <Text>{JSON.stringify(data[key])}</Text>
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
