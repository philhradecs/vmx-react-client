import Router from 'next/router';
import { Box, Button, TextInput } from 'grommet';
import { FormSearch, FormTrash } from 'grommet-icons';
import { useCallback } from 'react';

import YearInputRange from './YearInputRange/YearInputRange';
import InputAutosuggestion from './InputAutosuggestion/InputAutosuggestion';
import EnhancedForm from './EnhancedForm';
import EnhancedFormField from './EnhancedFormField';

import musicTypes from '../../../data/discogsMusicTypes190510';
import countries from '../../../data/countryList';
import { parser, serializer } from './YearInputRange/lib/parserSerializer';

const dropValuesRange = [1900, 2020];

const sortMusicType = (a, b) => {
  if (b.value === 'genre') {
    return 1;
  }
  return a.label > b.label;
};

const sortCountries = () => {};

function handleSubmit(event) {
  event.preventDefault();
  const cleanValues = JSON.parse(
    JSON.stringify(event.value, (k, v) => (v.length === 0 ? undefined : v))
  );
  if (Object.keys(cleanValues).includes('years')) {
    cleanValues.years = serializer(parser(cleanValues.years, dropValuesRange));
    cleanValues.years = cleanValues.years.replace(/\s/g, '');
  }
  // FIXME: Router.push does not route on index page
  Router.push({ pathname: '/explorer', query: cleanValues });
}

export default function FilterForm({ prevQuery, small }) {
  const initialValues = { ...prevQuery };

  const selectText = useCallback(event => {
    event.target.select();
  }, []);

  return (
    <Box margin={{ horizontal: '1rem' }}>
      <EnhancedForm
        small={small}
        formValues={initialValues}
        onSubmit={handleSubmit}
        direction="row"
      >
        <EnhancedFormField
          name="query"
          label="Keyword"
          component={TextInput}
          onClick={selectText}
          placeholder="type here"
        />
        <EnhancedFormField
          name="artist"
          label="Artist"
          component={TextInput}
          onClick={selectText}
          placeholder="type here"
        />
        <EnhancedFormField
          name="country"
          label="Country"
          component={InputAutosuggestion}
          suggestionSort={sortCountries}
          suggestionList={countries}
          // suggestionUser
          placeholder="type here"
        />
        <EnhancedFormField
          name="musicType"
          label="Genre"
          component={InputAutosuggestion}
          suggestionSort={sortMusicType}
          suggestionList={musicTypes}
          // suggestionUser
          placeholder="type here"
        />
        <EnhancedFormField
          name="years"
          label="Time"
          component={YearInputRange}
          dropValuesRange={dropValuesRange}
          placeholder="type here"
          parser={parser}
          serializer={serializer}
        />
        <Box
          direction={small ? 'row' : 'column'}
          pad={{ left: '1rem' }}
          gap="0.5rem"
          flex="grow"
        >
          <Button type="submit" label="Search" primary icon={<FormSearch />} />
          <Button type="reset" label="Clear" icon={<FormTrash />} />
        </Box>
      </EnhancedForm>
    </Box>
  );
}
