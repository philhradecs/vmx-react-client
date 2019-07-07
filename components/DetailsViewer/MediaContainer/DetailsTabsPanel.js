import { Box, Tabs, Tab, Text } from 'grommet';
import { useContext, useState } from 'react';
import { Disc, Group } from 'grommet-icons';
import IconWrapper from '../../IconWrapper';
import ApolloDataContext from '../../ApolloDataProvider/context';

export default function DetailsTabsPanel() {
  const [activeIndex, setActivIndex] = useState(0);
  const { data: detailsData, activeData } = useContext(ApolloDataContext);

  const withWrapper = (icon, tabIndex) => (
    <IconWrapper selected={activeIndex === tabIndex} highlightColor="accent-4">
      {icon}
    </IconWrapper>
  );

  return (
    <Tabs activeIndex={activeIndex} onActive={tab => setActivIndex(tab)}>
      <Tab title={withWrapper(<Disc color="brand" />, 0)}>
        <Box>
          {Object.keys(activeData)
            .filter(
              key => !['image', '__typename', 'title', 'id'].includes(key)
            )
            .map(key => (
              <Box key={key} direction="row" justify="between" gap="1.5rem">
                <Text weight="bold">
                  {key[0].toUpperCase() + key.substr(1)}
                </Text>
                <Text>{JSON.stringify(activeData[key])}</Text>
              </Box>
            ))}
        </Box>
      </Tab>
      <Tab title={withWrapper(<Group color="brand" />, 1)}>
        <Box pad="medium">Artist description</Box>
      </Tab>
    </Tabs>
  );
}
