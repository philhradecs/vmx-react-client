import { useContext } from 'react';
import { useGlobal } from 'reactn';
import { Box, Heading, Button, Text } from 'grommet';
import useHover from 'react-use-hover';
import { Filter } from 'grommet-icons';
import ApolloDataContext from '../../ApolloDataProvider/context';
import { ActiveSearchDataContext } from './context';

export default function ReleaseDetails() {
  const { releaseDetails } = useContext(ApolloDataContext);
  const { activeData } = useContext(ActiveSearchDataContext);

  const [updateFormField, setUpdateFormField] = useGlobal('updateFormField');

  // const { year, country, styles, genres, artists } = releaseDetails;
  function FilterButton({ value, filterKey }) {
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
        onClick={() => updateFormField(filterKey, value)}
        plain
        reverse
        icon={<Filter size="0.8rem" color={isHovering ? 'brand' : ''} />}
        gap="xsmall"
        style={style}
        {...hoverProps}
      />
    );
  }

  function DetailRow({ title, data, filterKey, dataKey }) {
    const dataArray = Array.isArray(data) ? [...data] : [data];

    return (
      <Box direction="row" justify="between" gap="1.5rem" align="center">
        <Heading level="2" size="1.1rem" margin="0">
          {title}
        </Heading>
        <Box direction="row" gap="0.5rem" flex={false} wrap>
          {dataArray.map(item => (
            <FilterButton
              value={dataKey ? item[dataKey] : item}
              filterKey={filterKey}
              key={`${filterKey}-${item}`}
            />
          ))}
        </Box>
      </Box>
    );
  }

  function TrackList({ data, ...props }) {
    return (
      <Box
        as="ul"
        direction="column"
        align="start"
        fill="horizontal"
        {...props}
      >
        {data.map(track => {
          return (
            <Box
              direction="row"
              justify="between"
              gap="1.5rem"
              key={track.position + track.title}
              fill="horizontal"
            >
              <Box>{track.position}</Box>
              <FilterButton value={track.title} filterKey="query" />
              <Box>{track.duration}</Box>
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Box dirction="column">
      <DetailRow
        title="Year"
        data={activeData.year.toString()}
        filterKey="years"
      />
      <DetailRow
        title="Country"
        data={activeData.country}
        filterKey="country"
      />
      <DetailRow
        title="Styles"
        data={activeData.styles}
        filterKey="musicType"
      />
      <DetailRow
        title="Genres"
        data={activeData.genres}
        filterKey="musicType"
      />
      <Box direction="row" justify="between">
        <Heading level="2" size="1.1rem" margin="0">
          Tracks
        </Heading>
        {!releaseDetails && <Text>loading ...</Text>}
      </Box>
      {releaseDetails && (
        <TrackList data={releaseDetails.tracklist} animation="fadeIn" />
      )}
    </Box>
  );
}
