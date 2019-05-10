import { Box, FormField, TextInput } from 'grommet';
import { useEffect, useLayoutEffect, useState } from 'react';
import musicTypes from './discogsMusicTypes190510';

function findAndSortMatches(items, keyword) {
  const re = new RegExp(keyword, 'i');
  const foundMatches = items.filter(({ label }) => label.match(re));
  foundMatches.sort((a, b) => a.label > b.label);

  return foundMatches;
}

function GenreInputDropdown({ presetInput }) {
  const [matches, setMatches] = useState([]);
  const [input, setInput] = useState(presetInput);

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
        placeholder="type here"
        dropAlign={{ top: 'bottom', left: 'left' }}
        dropContent={<Box pad="large" background="light-2" />}
        suggestions={matches}
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onSelect={selectedOption => {
          setInput(selectedOption.suggestion.label);
        }}
        onClick={event => event.target.select()}
        dropProps={{
          pad: { horizontal: '0.8rem', vertical: '0.5rem' },
          elevation: 'small'
        }}
      />
    </FormField>
  );
}

export default GenreInputDropdown;
