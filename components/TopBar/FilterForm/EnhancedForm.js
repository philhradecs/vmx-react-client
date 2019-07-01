import React from 'react';
import { Box, Form } from 'grommet';

export default function EnhancedForm({
  children,
  formValues,
  direction,
  small,
  ...props
}) {
  const childrenWithExtraProp = React.Children.map(children, child => {
    return React.cloneElement(child, {
      prevQuery: formValues,
      small
    });
  });

  return (
    <Form value={formValues} {...props}>
      <Box direction={direction} justify="between" align="center">
        {childrenWithExtraProp}
      </Box>
    </Form>
  );
}
