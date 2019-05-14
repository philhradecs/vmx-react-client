import { Box, TextInput } from 'grommet';
import { useEffect, useRef, useState } from 'react';
import countries from './countryList';

function findAndSortMatches(items, keyword) {
  const re = new RegExp(keyword, 'i');
  const foundMatches = items.filter(country => country.match(re));
  foundMatches.sort();

  return foundMatches;
}

export default function CountryInputDrop({ initialValue, ...formProps }) {
  const [matches, setMatches] = useState([]);
  const inputEl = useRef(null);

  useEffect(() => {
    if (formProps.value && formProps.value.length > 1) {
      const foundMatches = findAndSortMatches(countries, formProps.value);
      setMatches(foundMatches);
    } else {
      setMatches([]);
    }
  }, [formProps.value]);

  function handleSelect(event) {
    inputEl.current.value = event.suggestion;
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
