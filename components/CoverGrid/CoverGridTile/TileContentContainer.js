import { Box } from 'grommet';

export default function TileContentContainer({
  children,
  isHovering,
  ...props
}) {
  return (
    <Box
      fill
      border={{
        color: isHovering ? 'dark-1' : 'dark-6',
        size: '1px'
      }}
      overflow="hidden"
      round="4px"
      elevation={isHovering ? 'large' : 'small'}
      style={{
        transition: 'all 200ms ease',
        transitionDelay: isHovering ? '0' : '30'
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
