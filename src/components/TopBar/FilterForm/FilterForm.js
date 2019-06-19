import Router from 'next/router';
import { Box, Button, TextInput } from 'grommet';
import { FormSearch, FormTrash } from 'grommet-icons';

import YearInputRange from './YearInputRange/YearInputRange';
import InputAutosuggestion from './InputAutosuggestion/InputAutosuggestion';
import EnhancedForm from './EnhancedForm';
import EnhancedFormField from './EnhancedFormField';
import musicTypes from './InputAutosuggestion/data/discogsMusicTypes190510';
import countries from './InputAutosuggestion/data/countryList';
import { parser, serializer } from './YearInputRange/lib/parserSerializer';

const dropValuesRange = [1900, 2020];

const sortMusicType = (a, b) => {
  if (b.value === 'genre') {
    return 1;
  }
  return a.label > b.label;
};

const sortCountries = () => {};

export default function FilterForm({ prevQuery, small }) {
  function handleSubmit(event) {
    const cleanValues = JSON.parse(
      JSON.stringify(event.value, (k, v) => (v.length === 0 ? undefined : v))
    );
    if (Object.keys(cleanValues).includes('years')) {
      cleanValues.years = serializer(
        parser(cleanValues.years, dropValuesRange)
      );
      cleanValues.years = cleanValues.years.replace(/\s/g, '');
    }
    Router.push({ pathname: '/explorer', query: cleanValues });
  }

  const initialValues = { ...prevQuery };

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
          onClick={event => event.target.select()}
          placeholder="type here"
        />
        <EnhancedFormField
          name="artist"
          label="Artist"
          component={TextInput}
          onClick={event => event.target.select()}
          placeholder="type here"
        />
        <EnhancedFormField
          name="country"
          label="Country"
          component={InputAutosuggestion}
          suggestionSort={sortCountries}
          suggestionList={countries}
          suggestionUser
          placeholder="type here"
        />
        <EnhancedFormField
          name="musicType"
          label="Genre"
          component={InputAutosuggestion}
          suggestionSort={sortMusicType}
          suggestionList={musicTypes}
          suggestionUser
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
