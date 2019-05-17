import { useEffect, useReducer, useRef } from 'react';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';
import { init, dropValuesRange, dropEntries, reducer } from './reducer';

// TODO: serialize and parse functions from props
function serializeYears(arr = []) {
  const list = arr.sort();
  return list.length > 1 ? `${list[0]} - ${list[list.length - 1]}` : list[0];
}

function inputParser(yearInput = '') {
  const hasValue = yearInput.toString().match(/\d{4}/g);
  if (!hasValue) {
    return false;
  }

  const extractedValues = hasValue.map(val => +val);

  const yearArr =
    extractedValues.length > 2
      ? [extractedValues[0], extractedValues[1]]
      : extractedValues;

  const [min, max] = dropValuesRange;

  const eachWithinRange = arr => arr.every(val => val >= min && val <= max);
  const validRangeSpan = arr =>
    Math.abs(arr[0] - arr[arr.length - 1]) <= dropEntries - 1;

  return eachWithinRange(yearArr) && validRangeSpan(yearArr) && yearArr.sort();
}

export default function YearInputRange({ ...formProps }) {
  const [state, dispatch] = useReducer(reducer, formProps.value, init);
  const inputEl = useRef();

  return (
    <>
      <YearHotInput
        dispatch={dispatch}
        activeYears={state.years}
        ref={inputEl}
        inputParser={inputParser}
        serializeYears={serializeYears}
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
