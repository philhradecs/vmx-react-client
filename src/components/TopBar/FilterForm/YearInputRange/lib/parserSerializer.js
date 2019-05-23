function serializer(arr = []) {
  const list = arr.map(val => +val).sort();
  if (list.length > 1) {
    return `${list[0]} - ${list[list.length - 1]}`;
  }
  if (list.length === 1) {
    return list[0];
  }
  return '';
}

function parser(input = '', numRange, maxSpan) {
  const hasValue = input.toString().match(/\d{4}/g);
  if (!hasValue) {
    return [];
  }
  const extractedValues = hasValue.map(val => +val);

  let yearArr =
    extractedValues.length > 2
      ? [extractedValues[0], extractedValues[1]]
      : extractedValues;

  const [min, max] = numRange;

  const eachWithinRange = arr => arr.every(val => val >= min && val <= max);
  const validRangeSpan = arr =>
    Math.abs(arr[0] - arr[arr.length - 1]) <= maxSpan - 1;
  if (eachWithinRange(yearArr) && !validRangeSpan(yearArr)) {
    const minYear = Math.min(...yearArr);
    yearArr = [minYear, minYear + maxSpan - 1];
  }

  return eachWithinRange(yearArr) && validRangeSpan(yearArr) && yearArr.sort();
}

export { serializer, parser };
