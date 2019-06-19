import { FormField } from 'grommet';
import withChangeObserver from './withChangeObserver';

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
      label={small ? '' : label}
      placeholder={small ? label : placeholder}
      small={small}
    />
  );
}
