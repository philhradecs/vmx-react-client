import { FormField, Text } from 'grommet';
import withChangeObserver from './withChangeObserver';
import { StyledPlaceholder } from './StyledComponents';

export default function({
  component,
  prevQuery,
  small,
  placeholder,
  label,
  ...props
}) {
  const { parser, serializer, dropValuesRange } = props;

  const ChangeAwareComponent = withChangeObserver(
    component,
    prevQuery,
    parser,
    serializer,
    dropValuesRange
  );

  return (
    <FormField
      component={ChangeAwareComponent}
      {...props}
      label={<Text>{small ? '' : label}</Text>}
      placeholder={<StyledPlaceholder value={small ? label : placeholder} />}
      small={small}
    />
  );
}
