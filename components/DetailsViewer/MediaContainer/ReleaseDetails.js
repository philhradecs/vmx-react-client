import { useContext } from 'react';
import { Box, Heading, Button } from 'grommet';
import useHover from 'react-use-hover';
import { Filter } from 'grommet-icons';
import ApolloDataContext from '../../ApolloDataProvider/context';

export default function ReleaseDetails() {
  const { releaseDetails, activeData } = useContext(ApolloDataContext);

  // const { year, country, styles, genres } = releaseDetails;

  function DetailRow({ title, content, filterKey }) {
    const data = Array.isArray(content) ? [...content] : [content];

    return (
      <Box direction="row" justify="between" gap="1.5rem" align="center">
        <Heading level="2" size="1.1rem" margin="0">
          {title}:
        </Heading>
        <Box direction="row" gap="0.5rem" margin="0.2rem" flex={false} wrap>
          {data.map(item => <HoverItem value={item} filterKey={filterKey} />)}
        </Box>
      </Box>
    );
  }

  function applyFilter(filterObj) {
    console.log(filterObj);
  }

  function HoverItem({ value, filterKey }) {
    const [isHovering, hoverProps] = useHover({
      mouseEnterDelayMS: 0,
      mouseLeaveDelayMS: 0
    });
    const style = {
      border: isHovering ? '1px solid #7D4CDB' : '1px solid transparent',
      borderRadius: '4px',
      padding: '0 0.25rem'
    };

    return (
      <Button
        label={value}
        onClick={() => applyFilter({ [filterKey]: value })}
        plain
        reverse
        icon={<Filter size="0.8rem" color={isHovering ? 'brand' : ''} />}
        gap="xsmall"
        style={style}
        {...hoverProps}
      />
    );
  }

  return (
    <Box dirction="column">
      <DetailRow title="Year" content={activeData.year} filterKey="years" />
      <DetailRow
        title="Country"
        content={activeData.country}
        filterKey="country"
      />
      <DetailRow
        title="Styles"
        content={activeData.styles}
        filterKey="musicType"
      />
      <DetailRow
        title="Genres"
        content={activeData.genres}
        filterKey="musicType"
      />
    </Box>
  );
}
