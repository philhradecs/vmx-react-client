import { useEffect, useState } from 'react';
import { ThemeContext } from 'grommet';

export default function withChangeObserver(
  WrappedComponent,
  prevQuery = {},
  inputRangeOptions = {}
) {
  const { parser, serializer, dropValuesRange } = inputRangeOptions;

  const sanitize = val => val.replace(/\s+/g, '') || '';
  return ({ small, ...props }) => {
    const { name, value } = props;
    const fieldValue = prevQuery[name] || '';
    const [hasChanged, setHasChanged] = useState(false);
    const [initialFieldValue, setInitialFieldValue] = useState(fieldValue);

    useEffect(
      () => {
        if (parser && serializer) {
          setHasChanged(
            serializer(parser(value, dropValuesRange)) !==
              serializer(parser(initialFieldValue, dropValuesRange))
          );
        } else {
          setHasChanged(sanitize(initialFieldValue) !== sanitize(value));
        }
      },
      [initialFieldValue, name, value]
    );

    // TODO: manage `touched` input state globally to also be reflected by submit button style
    const newValue = small
      ? {
          textInput: {
            extend: { color: hasChanged ? '#ff7d28  ' : 'initial' }
          }
        }
      : {};

    return (
      <ThemeContext.Extend value={newValue}>
        <WrappedComponent {...props} />
      </ThemeContext.Extend>
    );
  };
}
