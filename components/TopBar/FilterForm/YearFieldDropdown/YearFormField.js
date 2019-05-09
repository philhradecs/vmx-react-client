import { useEffect, useReducer, useRef } from 'react';

import YearSelectDrop from './YearSelectDrop';
import YearHotInput from './YearHotInput';
import { initialState, reducer } from './reducer';

const dropValuesRange = [1900, 2020];

function serializeYears(arr) {
  const list = arr.sort();
  return list.length > 1 ? `${list[0]} - ${list[list.length - 1]}` : list[0];
}

function inputParser(yearInput) {
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
  const validRangeSpan = arr => Math.abs(arr[0] - arr[arr.length - 1]) <= 9;

  return eachWithinRange(yearArr) && validRangeSpan(yearArr) && yearArr.sort();
}

function YearFormField() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const textInputRef = useRef();

  useEffect(() => {}, [state.dropSelection, state.years]);

  return (
    <>
      <YearHotInput
        dispatch={dispatch}
        activeYears={state.years}
        ref={textInputRef}
        inputParser={inputParser}
        serializeYears={serializeYears}
      />
      {state.yearDropOpen && (
        <YearSelectDrop
          dispatch={dispatch}
          dropValues={state.dropValues}
          dropValuesRange={dropValuesRange}
          entries={10}
          presetSelection={state.dropSelection}
          textInputRef={textInputRef}
        />
      )}
    </>
  );
}

export default YearFormField;
