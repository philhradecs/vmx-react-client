import { FormField, Text } from 'grommet';
import { useContext } from 'react';
import withChangeObserver from './withChangeObserver';
import { StyledPlaceholder } from './StyledFilterFormComponents';
import TopBarContext from '../context';

export default function({
  component,
  placeholder,
  label,
  inputRangeOptions,
  ...formFieldProps
}) {
  const { small, prevQuery } = useContext(TopBarContext);

  const ChangeAwareComponent = withChangeObserver(
    component,
    prevQuery,
    inputRangeOptions
  );

  return (
    <FormField
      component={ChangeAwareComponent}
      inputRangeOptions={inputRangeOptions}
      {...formFieldProps}
      label={<Text>{small ? '' : label}</Text>}
      placeholder={<StyledPlaceholder value={small ? label : placeholder} />}
      small={small}
    />
  );
}
