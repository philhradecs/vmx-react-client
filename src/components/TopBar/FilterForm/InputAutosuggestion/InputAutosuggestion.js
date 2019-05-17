import { Box, TextInput } from 'grommet';
import { useEffect, useRef, useState } from 'react';

function findAndSortMatches(items, keyword, sortFunc) {
  const re = new RegExp(keyword, 'i');
  const foundMatches = items.filter(({ label }) => label.match(re));
  foundMatches.sort(sortFunc);

  return foundMatches;
}

export default function InputAutosuggestion({
  suggestionSort,
  suggestionList,
  ...formProps
}) {
  const [matches, setMatches] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    if (formProps.value && formProps.value.length > 1) {
      const foundMatches = findAndSortMatches(
        suggestionList,
        formProps.value,
        suggestionSort
      );
      setMatches(foundMatches);
    } else {
      setMatches([]);
    }
  }, [formProps.value]);

  function handleSelect(event) {
    inputEl.current.value = event.suggestion.label;
    formProps.onChange(event);
  }

  return (
    <TextInput
      name
      ref={inputEl}
      dropAlign={{ top: 'bottom', left: 'left' }}
      dropContent={<Box pad="large" background="light-2" />}
      suggestions={matches}
      onSelect={handleSelect}
      onClick={event => event.target.select()}
      dropProps={{
        pad: { horizontal: '0.8rem', vertical: '0.5rem' },
        elevation: 'small'
      }}
      plain
      {...formProps}
    />
  );
}
