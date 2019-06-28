import React, { useEffect, useState } from 'react';
import { Box, Button } from 'grommet';
import useHover from 'react-use-hover';

export default function IconWrapper({
  children,
  highlightColor,
  onClick,
  fill,
  disabled,
  iconPad,
  ...props
}) {
  const [isHovering, hoverProps] = useHover({
    mouseEnterDelayMS: 10,
    mouseLeaveDelayMS: 0
  });

  const { selected } = props;

  const [selectable, setSelectable] = useState(
    Object.prototype.hasOwnProperty.call(props, 'selected')
  );
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(
    () => {
      setIsSelected(selected);
    },
    [selected]
  );

  function handleClick(event) {
    if (selectable) {
      setIsSelected(true);
    }
    onClick(event);
  }

  let color = {};
  if (!disabled && highlightColor && (selectable ? isSelected : isHovering)) {
    color = { color: highlightColor };
  }

  const colouredIcon = React.cloneElement(children, color);

  // FIXME: fill breaks parent layout
  return (
    <Button
      fill={fill}
      onClick={handleClick}
      plain
      disabled={disabled}
      {...hoverProps}
      {...props}
    >
      <Box align="center" justify="center" iconPad={iconPad} pad={iconPad}>
        {colouredIcon}
      </Box>
    </Button>
  );
}
