function parserSerializer(numRange, maxSpan) {
  function serializer(arr = []) {
    const list = arr.sort();
    return list.length > 1 ? `${list[0]} - ${list[list.length - 1]}` : list[0];
  }

  function parser(input = '') {
    const hasValue = input.toString().match(/\d{4}/g);
    if (!hasValue) {
      return false;
    }

    const extractedValues = hasValue.map(val => +val);

    const yearArr =
      extractedValues.length > 2
        ? [extractedValues[0], extractedValues[1]]
        : extractedValues;

    const [min, max] = numRange;

    const eachWithinRange = arr => arr.every(val => val >= min && val <= max);
    const validRangeSpan = arr =>
      Math.abs(arr[0] - arr[arr.length - 1]) <= maxSpan - 1;

    return (
      eachWithinRange(yearArr) && validRangeSpan(yearArr) && yearArr.sort()
    );
  }
  return { parser, serializer };
}

export default parserSerializer;
