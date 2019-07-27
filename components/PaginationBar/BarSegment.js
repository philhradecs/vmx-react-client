import styled from 'styled-components';
import { Stack, Box, Text } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';

const HoverWrapper = styled(Box)`
  .pageTooltip {
    transform: ${({ showTooltip }) => (showTooltip ? 'scale(1)' : 'scale(0)')};
  }
  .pageSegment {
    background: ${({ isActive }) => (isActive ? '#FFCA58' : '#F2F2F2')};
  }

  &:hover .pageSegment {
    background: ${({ isActive }) => (isActive ? '#FFCA58' : '#e8e8e8')};
  }

  &:hover .pageTooltip {
    transform: scale(1);
    background: white;
    border: 1px solid #ffca58;
    z-index: 9;
  }
`;

export default function BarSegment({
  label,
  isActive,
  first,
  last,
  showTooltip
}) {
  const borderRadius = '100px';
  let round = false;

  if (first && last) {
    round = borderRadius;
  } else if (first || last) {
    round = {
      corner: (first && 'top') || (last && 'bottom'),
      size: borderRadius
    };
  }

  const primary = isActive;
  const transition = { transition: 'all 60ms ease-out' };

  return (
    <HoverWrapper
      fill
      align="center"
      justify="center"
      margin="0"
      pad="0"
      // showTooltip={primary || secondary}
      showTooltip={primary || showTooltip}
      isActive={isActive}
    >
      <Stack as="li" fill guidingChild="last">
        <Box
          className="pageSegment"
          round={round}
          fill="vertical"
          margin={{ horizontal: '6px' }}
          direction="column"
          justify="center"
          align="center"
          style={transition}
        >
          {/* <StatusGoodSmall size="0.2rem" color="white" /> */}
        </Box>
        <Box fill align="center" justify="center">
          <Box
            className="pageTooltip"
            border={{ color: primary ? 'accent-4' : 'light-2', size: '1px' }}
            background={primary ? 'white' : 'transparent'}
            style={transition}
            flex={false}
            height="1.5rem"
            width="1.5rem"
            round="100%"
            align="center"
            justify="center"
          >
            <Text size="0.6rem" weight={primary ? 'bold' : 'normal'}>
              {label}
            </Text>
          </Box>
        </Box>
      </Stack>
    </HoverWrapper>
  );
}
