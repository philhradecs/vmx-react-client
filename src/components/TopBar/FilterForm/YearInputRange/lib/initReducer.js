function initReducer(numRange, maxSpan, serializer, parser) {
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
    let selectedYears = initialYears;
    if (typeof selectedYears === 'string') {
      if (selectedYears.length === 0) {
        selectedYears = [];
      } else {
        selectedYears = [selectedYears];
      }
    }
    selectedYears = selectedYears.map(val => +val);
    const inputValue = serializer(selectedYears);
    const dropValues = createDropValuesArray(selectedYears);
    const dropSelection =
      selectedYears.length === 0
        ? []
        : [
            dropValues.indexOf(selectedYears[selectedYears.length - 1]),
            dropValues.indexOf(selectedYears[0])
          ].sort();

    const initialState = {
      inputValue,
      selectedYears,
      dropValues,
      dropSelection,
      yearDropOpen: false
    };
    return initialState;
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'parseInput': {
        const input = action.payload;
        const parsedValues = parser(input, numRange, maxSpan);
        if (
          parsedValues &&
          parsedValues.length > 0 &&
          !parsedValues.every((val, i) => val === state.selectedYears[i])
        ) {
          const newDropValues = createDropValuesArray(
            parsedValues,
            state.dropValues
          );
          const newDropSelection = [
            newDropValues.indexOf(parsedValues[parsedValues.length - 1]),
            newDropValues.indexOf(parsedValues[0])
          ].sort();

          return {
            inputValue: serializer(parsedValues),
            selectedYears: parsedValues,
            dropValues: newDropValues,
            dropSelection: newDropSelection,
            yearDropOpen: true
          };
        }

        return {
          ...state,
          inputValue: input
        };
      }
      case 'applyNewSelection': {
        const newDropSelection = action.payload;
        const newSelectedYears = readYearsByIndexRange(
          state.dropValues,
          newDropSelection
        );
        return {
          ...state,
          inputValue: serializer(newSelectedYears),
          dropSelection: newDropSelection,
          selectedYears: newSelectedYears
        };
      }
      case 'incrementDropValues': {
        const newSelectedYears = state.selectedYears.map(val => val + 1);
        return {
          ...state,
          inputValue: serializer(newSelectedYears),
          dropValues: state.dropValues.map(val => val + 1),
          selectedYears: newSelectedYears
        };
      }
      case 'decrementDropValues': {
        const selectedYears = state.selectedYears.map(val => val - 1);
        return {
          ...state,
          inputValue: serializer(selectedYears),
          dropValues: state.dropValues.map(val => val - 1),
          selectedYears
        };
      }
      case 'openDrop': {
        let newState = {};

        if (state.dropValues.length === 0) {
          const [min, max] = numRange;
          const randomValue = Math.floor(min + Math.random() * (max + 1 - min));
          newState = init([randomValue]);
        }

        return {
          ...state,
          ...newState,
          yearDropOpen: true
        };
      }
      case 'closeDrop':
        return { ...state, yearDropOpen: false };
      case 'reset':
        return init(action.payload);
      default:
        return state;
    }
  }

  return { init, reducer };
}

export default initReducer;
