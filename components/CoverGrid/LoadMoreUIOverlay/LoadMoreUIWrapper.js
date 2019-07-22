import React, { useState, useContext, useEffect } from 'react';
import { Stack, Box, Text, Button } from 'grommet';
import { LinkUp, Link, LinkDown } from 'grommet-icons';
import BreakBlock from './BreakBlock';
import ApolloDataContext from '../../ApolloDataProvider/context';
import IconWrapper from '../../IconWrapper';

export default function LoadMoreUIWrapper({
  children,
  callbackTop,
  callbackBottom,
  trackScroll,
  resetReachedEnds,
  minHeight,
  limit,
  step = 1
}) {
  const { variables, hasMore } = useContext(ApolloDataContext);
  const [height, setHeight] = useState(minHeight);

  function handleWheel(event) {
    if (trackScroll.top || trackScroll.bottom) {
      if (
        (trackScroll.top && event.deltaY < 0) ||
        (trackScroll.bottom && event.deltaY > 0)
      ) {
        return setHeight(v => v + parseInt(step, 10));
      }
      setHeight(minHeight);
      resetReachedEnds();
    }
    return undefined;
  }

  useEffect(
    () => {
      if (height > limit) {
        setHeight(minHeight);
        if (trackScroll.top) {
          callbackTop();
        } else if (trackScroll.bottom) {
          callbackBottom();
        }
        resetReachedEnds();
      }
    },
    [
      callbackBottom,
      callbackTop,
      height,
      limit,
      minHeight,
      resetReachedEnds,
      trackScroll.bottom,
      trackScroll.top
    ]
  );

  const addPixelSuffix = num => `${num}px`;
  const min = addPixelSuffix(minHeight);
  const current = addPixelSuffix(height);
  const progressDelta = (height - minHeight) / (limit - minHeight);

  return (
    <Stack fill onWheel={handleWheel} interactiveChild="first">
      <Box fill>{children}</Box>
      <Box direction="column" fill>
        <BreakBlock
          height={trackScroll.top ? current : min}
          align="start"
          pad={{ horizontal: '1rem' }}
          background={
            trackScroll.top
              ? { color: 'neutral-2', opacity: 1 - progressDelta }
              : 'rgba(255,255,255,0.2)'
          }
        >
          <IconWrapper
            disabled={!hasMore.prev}
            label={
              <Text size="small">
                {!hasMore.prev ? '' : `page ${variables.page - 1}`}
              </Text>
            }
          >
            <LinkUp size="1.2rem" color="brand" />
          </IconWrapper>
        </BreakBlock>

        <Box flex />

        <BreakBlock
          height={trackScroll.bottom ? current : min}
          align="start"
          pad={{ horizontal: '1rem' }}
          background={
            trackScroll.bottom
              ? { color: 'neutral-2', opacity: 1 - progressDelta }
              : 'rgba(255,255,255,0.2)'
          }
        >
          <IconWrapper
            disabled={!hasMore.next}
            label={
              <Text size="small">
                {!hasMore.next ? '' : `page ${variables.page + 1}`}
              </Text>
            }
          >
            <LinkDown size="1.2rem" color="brand" />
          </IconWrapper>
        </BreakBlock>
      </Box>
    </Stack>
  );
}
