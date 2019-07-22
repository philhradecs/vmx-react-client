import { Box } from 'grommet';

export default function BreakBlock({ children, ...props }) {
  return (
    <Box
      justify="center"
      {...props}
      style={{ transition: 'all 120ms ease-out' }}
    >
      {children}
    </Box>
  );
}
