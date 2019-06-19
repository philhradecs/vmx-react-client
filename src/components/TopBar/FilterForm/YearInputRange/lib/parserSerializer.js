function serializer(list = []) {
  if (list.length > 1) {
    return `${list[0]} - ${list[list.length - 1]}`;
  }
  if (list.length === 1) {
    return list[0].toString();
  }
  return '';
}

function parser(input = '', numRange) {
  const hasValue = input.toString().match(/\d+/g);

  // const hasValue = input.toString().match(/\d{4}/g);
  if (!hasValue) {
    return [];
  }
  const extractedValues = hasValue.map(val => +val).sort();
  const uniqueYears = [...new Set(extractedValues)];

  const yearArr =
    uniqueYears.length > 2 ? [uniqueYears[0], uniqueYears[1]] : uniqueYears;

  const [min, max] = numRange;

  const eachWithinRange = arr => arr.every(val => val >= min && val <= max);

  return eachWithinRange(yearArr) ? yearArr : [];
}

export { serializer, parser };
