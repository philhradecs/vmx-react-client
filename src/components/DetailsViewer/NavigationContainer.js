import React, { useCallback, useEffect, useState } from 'react';
import { Box, Keyboard } from 'grommet';
import { Previous, Next } from 'grommet-icons';

import NavigationPanel from './NavigationPanel';

export default function NavigationContainer({
  children,
  initialIndex,
  data,
  navWidth,
  ...props
}) {
  const maxIndex = data.length - 1;
  const [activeIndex, setActiveIndex] = useState(initialIndex || 0);
  const [limitReached, setLimitReached] = useState({
    min: initialIndex < 0,
    max: initialIndex > maxIndex
  });

  function increaseIndex() {
    let nextIndex = activeIndex + 1;
    let max = false;
    if (nextIndex >= maxIndex) {
      nextIndex = maxIndex;
      max = true;
    }
    setActiveIndex(nextIndex);
    setLimitReached({ min: false, max });
  }

  function decreaseIndex() {
    let nextIndex = activeIndex - 1;
    let min = false;
    if (nextIndex <= 0) {
      nextIndex = 0;
      min = true;
    }
    setActiveIndex(nextIndex);
    setLimitReached({ min, max: false });
  }

  return (
    <Keyboard onLeft={decreaseIndex} onRight={increaseIndex} target="document">
      <Box {...props}>
        <NavigationPanel
          icon={<Previous />}
          handleClick={decreaseIndex}
          disabled={limitReached.min}
          width={navWidth}
          flex={false}
        />
        {React.cloneElement(children, { data: data[activeIndex] })}
        <NavigationPanel
          icon={<Next />}
          handleClick={increaseIndex}
          disabled={limitReached.max}
          width={navWidth}
          flex={false}
        />
      </Box>
    </Keyboard>
  );
}
