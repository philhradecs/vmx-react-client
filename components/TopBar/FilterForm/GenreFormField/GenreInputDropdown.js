import { Box, FormField, TextInput } from 'grommet';
import { useEffect, useLayoutEffect, useState } from 'react';

function findAndSortMatches(items, keyword) {
  const re = new RegExp(keyword, 'i');
  const foundMatches = items.filter(({ label }) => label.match(re));
  foundMatches.sort((a, b) => {
    const aIndex = a.label.search(re);
    const bIndex = b.label.search(re);

    if (aIndex === bIndex) {
      return a.label > b.label;
    }
    return aIndex > bIndex;
  });
  return foundMatches;
}

const musicTypes = [
  { label: 'Punk Rock', value: 'style' },
  { label: 'Papa Rock', value: 'style' },
  { label: 'Rock', value: 'genre' },
  { label: 'Chicago Jazz', value: 'style' },
  { label: 'Chicago Rock', value: 'style' }
];

function GenreInputDropdown() {
  const [matches, setMatches] = useState([]);
  const [input, setInput] = useState(null);

  useEffect(() => {
    if (input && input.length > 1) {
      const foundMatches = findAndSortMatches(musicTypes, input);
      setMatches(foundMatches);
    } else {
      setMatches([]);
    }
  }, [input]);

  return (
    <FormField name="musicType" label="Genre">
      <TextInput
        label="Genre"
        dropAlign={{ top: 'bottom', left: 'left' }}
        dropContent={<Box pad="large" background="light-2" />}
        suggestions={matches}
        onChange={event => setInput(event.target.value)}
        onSelect={selectedOption => {
          setInput(selectedOption.suggestion.label);
        }}
        dropProps={{
          pad: { horizontal: '0.8rem', vertical: '0.5rem' },
          elevation: 'small'
        }}
      />
    </FormField>
  );
}

export default GenreInputDropdown;
