function initReducer(numRange, serializer, parser) {
  function readYearsByIndexRange(dropValues, [start, end]) {
    return dropValues.slice(start, end + 1);
  }

  function createDropValuesArray() {
    return Array.from(
      { length: Math.abs(numRange[0] - numRange[1]) + 1 },
      (v, k) => numRange[0] + k
    );
  }

  function randomValueInRange(count, range = [...numRange]) {
    const [min, max] = range;
    const getNumber = () => Math.floor(min + Math.random() * (max + 1 - min));
    if (count && count > 1) {
      const result = [];
      for (let i = 0; i < count; i += 1) {
        let newNum = getNumber();
        while (result.includes(newNum)) {
          newNum = getNumber();
        }
        result.push(newNum);
      }
      return result.sort();
    }
    return getNumber();
  }

  function init(initialInput) {
    const selectedYears = parser(initialInput, numRange);
    const inputValue = serializer(selectedYears);
    const dropValues = createDropValuesArray(selectedYears);
    const dropSelection =
      selectedYears.length === 0
        ? []
        : [
            dropValues.indexOf(selectedYears[0]),
            dropValues.indexOf(selectedYears[selectedYears.length - 1])
          ];
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
        const parsedValues = parser(input, numRange);

        // parsed values differ from selectedYears
        if (
          (parsedValues.length > 0 &&
            parsedValues.length !== state.selectedYears.length) ||
          !parsedValues.every((val, i) => val === state.selectedYears[i])
        ) {
          const newDropSelection = [
            state.dropValues.indexOf(parsedValues[0]),
            state.dropValues.indexOf(parsedValues[parsedValues.length - 1])
          ];

          return {
            ...state,
            inputValue: serializer(parsedValues),
            selectedYears: parsedValues,
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
      case 'shiftSelectedYears': {
        const mod = action.payload;
        const newYears = state.selectedYears.map(year => year + mod);
        const newSelection = state.dropSelection.map(val => val + mod);
        return {
          ...state,
          inputValue: serializer(newYears),
          selectedYears: newYears,
          dropSelection: newSelection
        };
      }
      case 'openDrop': {
        let newState = {};

        if (state.selectedYears.length === 0) {
          const randomInput = serializer(randomValueInRange(2));
          newState = { ...init(randomInput), inputValue: '' };
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
        return { ...state };
    }
  }

  return { init, reducer };
}

export default initReducer;
