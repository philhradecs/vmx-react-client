import { useReducer, useRef, useCallback } from 'react';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';
import initReducer from './lib/initReducer';
import parserSerializer from './lib/parserSerializer';

export default function YearInputRange({
  dropValuesRange,
  dropEntries,
  ...formProps
}) {
  const { parser, serializer } = parserSerializer(dropValuesRange, dropEntries);
  const { init, reducer } = initReducer(dropValuesRange, dropEntries);

  const [state, dispatch] = useReducer(reducer, formProps.value, init);
  const inputEl = useRef();

  const memoizedParser = useCallback(input => parser(input), [parser]);
  const memoizedSerializer = useCallback(input => serializer(input), [
    serializer
  ]);

  return (
    <>
      <YearHotInput
        dispatch={dispatch}
        activeYears={state.years}
        ref={inputEl}
        inputParser={memoizedParser}
        serializeYears={memoizedSerializer}
        {...formProps}
      />
      {state.yearDropOpen && (
        <YearSelectDrop
          dispatch={dispatch}
          dropValues={state.dropValues}
          dropValuesRange={dropValuesRange}
          entries={dropEntries}
          presetSelection={state.dropSelection}
          textInputRef={inputEl}
        />
      )}
    </>
  );
}
