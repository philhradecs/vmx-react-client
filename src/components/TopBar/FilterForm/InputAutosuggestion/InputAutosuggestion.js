import { Box, TextInput } from 'grommet';
import { useEffect, useRef, useState } from 'react';

export default function InputAutosuggestion({
  suggestionSort,
  suggestionList,
  suggestionUser,
  ...formProps
}) {
  const [matches, setMatches] = useState([]);

  function findAndSortMatches(keyword) {
    const re = new RegExp(keyword, 'i');
    let foundMatches = suggestionList.filter(({ label }) => label.match(re));
    foundMatches.sort(suggestionSort);

    if (suggestionUser) {
      const isDuplicate =
        foundMatches.length > 0
          ? foundMatches.some(
              ({ label }) => label.toLowerCase() === keyword.toLowerCase()
            )
          : false;
      if (!isDuplicate) {
        const userEntry = { label: keyword, value: 'style' };
        foundMatches = [userEntry, ...foundMatches];
      }
    }

    return foundMatches;
  }

  function sanitizeInput(input) {
    return input
      .split(' ')
      .map(
        word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
      )
      .join(' ');
  }

  useEffect(() => {
    const currentValue = formProps.value;
    if (currentValue && currentValue.length > 1) {
      const foundMatches = findAndSortMatches(currentValue);
      setMatches(foundMatches);
    } else {
      setMatches([]);
    }
  }, [formProps.value]);

  function handleSelect(event) {
    const sanitizedInput = sanitizeInput(event.suggestion.label);
    formProps.onChange({ value: sanitizedInput });
  }

  return (
    <TextInput
      name
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
