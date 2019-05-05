import { useEffect, useReducer, useRef, useState } from 'react';
import { FormField, TextInput } from 'grommet';

import YearSelectDrop from './YearSelectDrop';

const displayValueRange = [1900, 2020];

function createDisplayValuesArray(yearArr) {
  const centralValue =
    yearArr.length > 1 ? Math.ceil((yearArr[0] + yearArr[1]) / 2) : yearArr[0];

  let arr = Array.from({ length: 10 }, (v, k) => centralValue + k - 5);
  if (arr[0] < displayValueRange[0]) {
    arr = arr.map(num => num + displayValueRange[0] - arr[0]);
  } else if (arr[arr.length - 1] > displayValueRange[1]) {
    arr = arr.map(num => num - (arr[arr.length - 1] - displayValueRange[1]));
  }
  return arr.reverse();
}

function validateAndParseInput(yearInput) {
  const hasValue = yearInput.toString().match(/\d{4}/g);
  if (!hasValue) {
    return false;
  }
  debugger;

  const extractedValues = hasValue.map(val => +val);

  const yearArr =
    extractedValues.length > 2
      ? [extractedValues[0], extractedValues[1]]
      : extractedValues;

  const [min, max] = displayValueRange;

  const eachWithinRange = arr => arr.every(val => val >= min && val <= max);
  const validRangeSpan = arr => Math.abs(arr[0] - arr[arr.length - 1]) <= 9;

  return eachWithinRange(yearArr) && validRangeSpan(yearArr) && yearArr.sort();
}

function serializeYearsArray(arr) {
  const list = arr.sort();
  return list.length > 1 ? `${list[0]} - ${list[list.length - 1]}` : list[0];
}

const initialState = {
  yearInput: '2005',
  yearValidated: [2005],
  displayValues: createDisplayValuesArray([2005]),
  selectedYears: [],
  selectedIndex: [3, 4]
};

function readYearsByIndexRange(displayValues, indexRange) {
  return displayValues.slice(...indexRange);
}

function reducer(state, action) {
  switch (action.type) {
    case 'updateDisplayValues':
      return {
        displayValues: () => createDisplayValuesArray(state.yearValidated),
        ...state
      };
    case 'updateByInput':
      return {
        yearValidated: action.payload,
        selectedIndex: [
          state.displayValues.indexOf(action.payload),
          state.displayValues.indexOf(action.payload)
        ],
        displayValues: () => createDisplayValuesArray(action.payload),
        ...state
      };
    case 'updateByScrollEvent': {
      const newYearValidated = state.yearValidated.map(
        year => year + action.payload
      );
      const newDisplayValues = createDisplayValuesArray(newYearValidated);

      return {
        displayValues: newDisplayValues,
        yearValidated: newYearValidated,
        ...state
      };
    }
    case 'updateBySelectionChange':
      return {
        yearValidated: readYearsByIndexRange(
          state.displayValues,
          action.payload
        )
      };
    case 'setYearInput':
      return {
        yearInput: action.payload,
        ...state
      };
    case 'openDrop':
      return { yearDropOpen: true, ...state };
    case 'closeDrop':
      return { yearDropOpen: false, ...state };
    default:
      return state;
  }
}

function YearFormField() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [yearInput, setYearInput] = useState('');

  // update (validated) input year and apply it to displayed range and selection range
  useEffect(() => {
    const validInput = validateAndParseInput(yearInput);
    if (validInput) {
      dispatch({ type: 'updateByInput', payload: validInput });
    }
  }, [yearInput]);

  // update selectedYears state after scroll and input
  useEffect(() => {
    console.log('yearValidated changed');
  }, [state.yearValidated]);

  const textInputRef = useRef();

  function handleScroll(event) {
    event.preventDefault();
    const [minRange, maxRange] = displayValueRange;
    const years = [...state.displayValues];

    if (event.deltaY < 0 && years[0] < maxRange) {
      dispatch({ type: 'updateByScrollEvent', payload: 1 });
    } else if (years[years.length - 1] > minRange) {
      dispatch({ type: 'updateByScrollEvent', payload: -1 });
    }
  }

  return (
    <>
      <FormField name="year" label="Time">
        <TextInput
          id="yearInput"
          ref={textInputRef}
          placeholder="type here"
          type="string"
          value={yearInput}
          onChange={event => setYearInput(event.target.value)}
          onFocusCapture={() => dispatch({ type: 'openDrop' })}
          onClick={event => event.target.select()}
        />
      </FormField>

      {state.yearDropOpen && (
        <YearSelectDrop
          textInputRef={textInputRef}
          handleClickOutside={() => dispatch({ type: 'closeDrop' })}
          handleScroll={handleScroll}
          displayValues={state.displayValues}
          handleSelectionChange={values =>
            dispatch({ type: 'updateBySelectionChange', payload: values })
          }
          selectedIndex={state.selectedIndex}
        />
      )}
    </>
  );
}

export default YearFormField;
