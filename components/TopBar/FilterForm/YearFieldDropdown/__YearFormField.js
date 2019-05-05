import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

function sanitizeInput(inputYear) {
  if (!inputYear) return false;

  const extractedValues = inputYear
    .toString()
    .match(/\d{4}/g)
    .map(val => +val);

  const yearArr =
    extractedValues.length > 2
      ? [extractedValues[0], extractedValues[1]]
      : extractedValues;

  const [min, max] = displayValueRange;

  const eachWithinRange = arr => arr.every(val => val >= min && val <= max);
  const validRangeSpan = arr => Math.abs(arr[0] - arr[arr.length - 1]) <= 9;

  return eachWithinRange(yearArr) && validRangeSpan(yearArr) && yearArr.sort();
}

function YearFormField({ preselectedYear }) {
  const [yearInput, setYearInput] = useState(preselectedYear);
  const [yearValidated, setYearValidated] = useState([preselectedYear]);
  const [displayValues, setDisplayValues] = useState(
    createDisplayValuesArray(preselectedYear)
  );
  const [yearDropOpen, setYearDropOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState([preselectedYear]);
  const [selectedIndex, setSelectedIndex] = useState([
    displayValues.indexOf(preselectedYear),
    displayValues.indexOf(preselectedYear)
  ]);

  useLayoutEffect(() => {
    const expectedIndex = displayValues.indexOf(parseInt(yearValidated, 10));
    setSelectedIndex([expectedIndex, expectedIndex]);
    setDisplayValues(createDisplayValuesArray(yearValidated));
    return () => {};
  }, [yearValidated, displayValues]);

  // update (validated) input year and apply it to displayed range and selection range
  useEffect(() => {
    const validInput = sanitizeInput(yearInput);
    if (validInput) {
      setYearValidated(validInput);
    }
    return () => {};
  }, [yearInput]);

  // update selectedYears state after scroll and input
  useLayoutEffect(() => {
    const result = [];
    for (let i = selectedIndex[0]; i <= selectedIndex[1]; i += 1) {
      result.push(displayValues[i]);
    }
    const inputText =
      result.length > 1
        ? `${result[result.length - 1]} - ${result[0]}`
        : result[0];

    setYearInput(inputText);
    setSelectedYears(result);
  }, [selectedIndex, displayValues]);

  const textInputRef = useRef();

  function handleScroll(event) {
    event.preventDefault();

    let changeVal = 0;

    if (event.deltaY < 0 && displayValues[0] < displayValueRange[1]) {
      changeVal = 1;
    } else if (displayValues[displayValues.length - 1] > displayValueRange[0]) {
      changeVal = -1;
    }
    setDisplayValues(displayValues.map(value => value + changeVal));
  }
  return (
    <>
      <FormField name="year" label="Time">
        <TextInput
          id="yearInput"
          ref={textInputRef}
          placeholder="type here"
          type="string"
          // min={displayValueRange[0]}
          // max={displayValueRange[1]}
          value={yearInput}
          onChange={event => setYearInput(event.target.value)}
          onFocusCapture={() => setYearDropOpen(true)}
          onClick={event => event.target.select()}
        />
      </FormField>

      {yearDropOpen && (
        <YearSelectDrop
          textInputRef={textInputRef}
          handleClickOutside={() => setYearDropOpen(false)}
          handleScroll={handleScroll}
          displayValues={displayValues}
          handleSelectionChange={values => setSelectedIndex(values)}
          selectedIndex={selectedIndex}
        />
      )}
    </>
  );
}

export default YearFormField;
