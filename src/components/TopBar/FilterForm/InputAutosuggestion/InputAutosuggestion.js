import { TextInput } from 'grommet';
import { useCallback, useEffect, useState } from 'react';

export default function InputAutosuggestion({
  suggestionSort,
  suggestionList,
  suggestionUser,
  ...formProps
}) {
  const [matches, setMatches] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const { value } = formProps;

  const findAndSortMatches = useCallback(
    keyword => {
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
    },
    [suggestionList, suggestionSort, suggestionUser]
  );

  useEffect(() => {
    if (!initialRender && value && value.length > 1) {
      const foundMatches = findAndSortMatches(value);
      setMatches(foundMatches);
    } else {
      setMatches([]);
    }
  }, [findAndSortMatches, value, initialRender]);

  function handleSelect(event) {
    function sanitizeInput(input) {
      return input
        .split(' ')
        .map(
          word => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
        )
        .join(' ');
    }
    const sanitizedInput = sanitizeInput(event.suggestion.label);
    formProps.onChange({ value: sanitizedInput });
  }

  function handleFocusClick(event) {
    event.target.select();
    setInitialRender(false);
  }

  return (
    <TextInput
      dropAlign={{ top: 'bottom', left: 'left' }}
      suggestions={matches}
      onSelect={handleSelect}
      onClick={handleFocusClick}
      onFocus={handleFocusClick}
      dropProps={{
        pad: { horizontal: '0.8rem', vertical: '0.5rem' },
        elevation: 'small'
      }}
      plain
      {...formProps}
    />
  );
}
