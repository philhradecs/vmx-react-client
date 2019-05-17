const dropValuesRange = [1900, 2020]; // TODO: parameters from props
const dropEntries = 10;

function readYearsByIndexRange(dropValues, [start, end]) {
  return dropValues.slice(start, end + 1);
}

function createDropValuesArray(selectedYears = [], dropValues = []) {
  if (selectedYears.length < 1) {
    return undefined;
  }
  if (dropValues.length > 1) {
    if (selectedYears.every(year => dropValues.includes(year))) {
      return dropValues;
    }
  }

  const centralValue =
    selectedYears.length > 1
      ? Math.ceil((selectedYears[0] + selectedYears[1]) / 2)
      : selectedYears[0];

  let arr = Array.from(
    { length: dropEntries },
    (v, k) => centralValue + k - Math.ceil(dropEntries / 2)
  );
  if (arr[0] < dropValuesRange[0]) {
    arr = arr.map(num => num + dropValuesRange[0] - arr[0]);
  } else if (arr[arr.length - 1] > dropValuesRange[1]) {
    arr = arr.map(num => num - (arr[arr.length - 1] - dropValuesRange[1]));
  }
  return arr.reverse();
}

function init(initialYears = []) {
  let years = initialYears;
  if (typeof years !== 'object') {
    years = [years];
  }
  const dropValues = createDropValuesArray(years);

  let dropSelection = years ? years.map(year => dropValues.indexOf(year)) : [];

  if (dropSelection.length === 1) {
    dropSelection = dropSelection.concat(dropSelection);
  }

  const initialState = {
    years,
    dropValues,
    dropSelection,
    yearDropOpen: false
  };
  return initialState;
}

function reducer(state, action) {
  switch (action.type) {
    case 'applyUserInput': {
      const years = action.payload;
      const newDropValues = createDropValuesArray(years, state.dropValues);
      return {
        ...state,
        years,
        dropValues: newDropValues,
        dropSelection: [
          newDropValues.indexOf(years[years.length - 1]),
          newDropValues.indexOf(years[0])
        ].sort()
      };
    }
    case 'applyUserSelection':
      return {
        ...state,
        dropSelection: action.payload,
        years: readYearsByIndexRange(state.dropValues, action.payload)
      };
    case 'incrementDropValues': {
      return {
        ...state,
        dropValues: state.dropValues.map(val => val + 1),
        years: state.years.map(val => val + 1)
      };
    }
    case 'decrementDropValues': {
      return {
        ...state,
        dropValues: state.dropValues.map(val => val - 1),
        years: state.years.map(val => val - 1)
      };
    }
    case 'openDrop':
      return { ...state, yearDropOpen: true };
    case 'closeDrop':
      return { ...state, yearDropOpen: false };
    case 'clearField':
      return init(action.payload);
    default:
      return state;
  }
}

export { init, dropValuesRange, dropEntries, reducer };
