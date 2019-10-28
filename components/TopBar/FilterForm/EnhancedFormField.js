import React, { useContext } from 'react';
import { FormField, Text, ThemeContext } from 'grommet';

import { StyledPlaceholder } from './StyledFilterFormComponents';
import TopBarContext from '../context';

export default function EnhancedFormField({
  children,
  placeholder,
  label,
  inputRangeOptions,
  modified,
  clearInput,
  hasValue,
  ...formFieldProps
}) {
  const { small } = useContext(TopBarContext);

  const sizeAdjustedPlaceholder = (
    <StyledPlaceholder value={small ? label : placeholder} />
  );

  const adjustedChildren = React.cloneElement(children, {
    placeholder: sizeAdjustedPlaceholder
  });

  const newValue = modified
    ? { formField: { border: { color: 'orange', style: 'dashed' } } }
    : {};

  return (
    <ThemeContext.Extend value={newValue}>
      <FormField
        inputRangeOptions={inputRangeOptions}
        label={<Text>{small ? '' : label}</Text>}
        clearInput={clearInput}
        hasValue={hasValue}
        {...formFieldProps}
      >
        {adjustedChildren}
      </FormField>
    </ThemeContext.Extend>
  );
}
