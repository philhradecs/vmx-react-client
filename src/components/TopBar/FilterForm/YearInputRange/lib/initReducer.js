function initReducer(numRange, maxSpan) {
  function readYearsByIndexRange(dropValues, [start, end]) {
    return dropValues.slice(start, end + 1);
  }

  function createDropValuesArray(selectedYears = [], dropValues = []) {
    if (selectedYears.length < 1) {
      return [];
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
      { length: maxSpan },
      (v, k) => centralValue + k - Math.ceil(maxSpan / 2)
    );
    if (arr[0] < numRange[0]) {
      arr = arr.map(num => num + numRange[0] - arr[0]);
    } else if (arr[arr.length - 1] > numRange[1]) {
      arr = arr.map(num => num - (arr[arr.length - 1] - numRange[1]));
    }
    return arr.reverse();
  }

  function init(initialYears = []) {
    let years = initialYears;
    if (typeof years === 'string') {
      years = [years];
    }

    let dropValues = [];
    let dropSelection = [];

    if (years.length === 0) {
      dropValues = createDropValuesArray([numRange[1]]);
      const randomIndex = Math.floor(Math.random() * maxSpan);
      dropSelection = [randomIndex, randomIndex];
    } else {
      dropValues = createDropValuesArray(years);
      dropSelection = years.map(year => dropValues.indexOf(year));
      if (dropSelection.length === 1) {
        dropSelection = dropSelection.concat(dropSelection);
      }
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

  return { init, reducer };
}

export default initReducer;
