import Link from 'next/link';

import { Box, Text } from 'grommet';
import IconWrapper from '../../IconWrapper';

export default function BreakBlock({
  children,
  anchor,
  href,
  label,
  icon,
  ...props
}) {
  return (
    <Box
      justify={anchor === 'top' ? 'end' : 'start'}
      pad="1rem"
      round={{ corner: anchor === 'top' ? 'bottom' : 'top', size: '100%' }}
      animation="fadeIn"
      fill="horizontal"
      style={{
        transition: 'all 120ms ease-out',
        position: 'absolute',
        [anchor]: '0'
      }}
      {...props}
    >
      <Link href={href}>
        <IconWrapper label={<Text size="small">{label}</Text>}>
          {icon}
        </IconWrapper>
      </Link>
    </Box>
  );
}
