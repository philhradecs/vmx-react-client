import React, { useContext } from 'react';
import { Box, Form } from 'grommet';
import TopBarContext from '../context';

export default function EnhancedForm({ children, direction, ...props }) {
  const { prevQuery, small } = useContext(TopBarContext);
  const childrenWithExtraProp = React.Children.map(children, child => {
    return React.cloneElement(child, {
      prevQuery,
      small
    });
  });

  return (
    <Form value={prevQuery} {...props}>
      <Box direction={direction} justify="between" align="center">
        {childrenWithExtraProp}
      </Box>
    </Form>
  );
}
