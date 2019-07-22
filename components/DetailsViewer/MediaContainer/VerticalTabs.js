/* eslint-disable import/prefer-default-export */
import { ThemeContext, Tabs } from 'grommet';

export default function VerticalTabs({ children, ...props }) {
  const value = {
    tabs: {
      extend: { flexDirection: 'row' },
      header: {
        extend: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
          margin: '0.4rem 1.5rem 0.4rem 0',

          rowGap: '0.5rem'
        }
      },
      panel: { extend: { width: '100%' } }
    }
  };

  return (
    <ThemeContext.Extend value={value}>
      <Tabs {...props}>{children}</Tabs>
    </ThemeContext.Extend>
  );
}
