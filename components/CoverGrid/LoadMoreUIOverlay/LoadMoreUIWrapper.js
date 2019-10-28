import React, { useState, useContext, useEffect } from 'react';

import { Box } from 'grommet';
import { LinkUp, LinkDown } from 'grommet-icons';
import BreakBlock from './BreakBlock';
import ApolloDataContext from '../../ApolloDataProvider/context';

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
  const current = addPixelSuffix(height + minHeight);
  const progressDelta = (height - minHeight) / (limit - minHeight);

  return (
    <Box fill onWheel={handleWheel} style={{ position: 'relative' }}>
      <Box fill>{children}</Box>

      {hasMore.prev &&
        trackScroll.top && (
          <BreakBlock
            anchor="top"
            height={current}
            background={
              trackScroll.top
                ? { color: 'neutral-2', opacity: 0.8 * (1 - progressDelta) }
                : 'rgba(255,255,255,0.4)'
            }
            href={{
              pathname: '/explorer',
              query: { ...variables, page: variables.page - 1 }
            }}
            label={`page ${variables.page - 1}`}
            icon={<LinkUp size="1.2rem" color="brand" />}
          />
        )}

      {hasMore.next &&
        trackScroll.bottom && (
          <BreakBlock
            anchor="bottom"
            height={current}
            background={
              trackScroll.bottom
                ? { color: 'neutral-2', opacity: 0.8 * (1 - progressDelta) }
                : 'rgba(255,255,255,0.4)'
            }
            href={{
              pathname: '/explorer',
              query: { ...variables, page: variables.page + 1 }
            }}
            label={`page ${variables.page + 1}`}
            icon={<LinkDown size="1.2rem" color="brand" />}
          />
        )}
    </Box>
  );
}
