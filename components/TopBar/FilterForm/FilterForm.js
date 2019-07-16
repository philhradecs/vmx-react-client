import Router from 'next/router';
import { Box, Button } from 'grommet';
import { FormSearch, FormTrash } from 'grommet-icons';
import { useCallback, useContext } from 'react';

import YearInputRange from './YearInputRange/YearInputRange';
import InputAutosuggestion from './InputAutosuggestion/InputAutosuggestion';
import EnhancedForm from './EnhancedForm';
import EnhancedFormField from './EnhancedFormField';
import { StyledTextInput, StyledPlaceholder } from './StyledComponents';

import musicTypes from '../../../data/discogsMusicTypes190510';
import countries from '../../../data/countryList';
import { parser, serializer } from './YearInputRange/lib/parserSerializer';
import TopBarContext from '../context';

const dropValuesRange = [1900, 2020];

const sortMusicType = (a, b) => {
  if (b.value === 'genre') {
    return 1;
  }
  return a.label > b.label;
};

const sortCountries = () => {};

function handleSubmit(event) {
  console.log(event.value);
  event.preventDefault();
  const cleanValues = JSON.parse(
    JSON.stringify(event.value, (k, v) => (v.length === 0 ? undefined : v))
  );
  if (Object.keys(cleanValues).includes('years')) {
    cleanValues.years = serializer(parser(cleanValues.years, dropValuesRange));
    cleanValues.years = cleanValues.years.replace(/\s/g, '');
  }
  cleanValues.page = 1;
  cleanValues.per_page = 50;
  Router.push({ pathname: '/explorer', query: cleanValues });
}

export default function FilterForm() {
  const { small } = useContext(TopBarContext);

  const selectText = useCallback(event => {
    event.target.select();
  }, []);

  return (
    <Box margin={{ horizontal: '1rem' }}>
      <EnhancedForm onSubmit={handleSubmit} direction="row">
        <EnhancedFormField
          name="query"
          label="Keyword"
          component={StyledTextInput}
          onClick={selectText}
          placeholder={<StyledPlaceholder value="type here" />}
        />
        <EnhancedFormField
          name="artist"
          label="Artist"
          component={StyledTextInput}
          onClick={selectText}
          placeholder={<StyledPlaceholder value="type here" />}
        />
        <EnhancedFormField
          name="country"
          label="Country"
          component={InputAutosuggestion}
          suggestionSort={sortCountries}
          suggestionList={countries}
          // suggestionUser
          placeholder={<StyledPlaceholder value="type here" />}
        />
        <EnhancedFormField
          name="musicType"
          label="Genre"
          component={InputAutosuggestion}
          suggestionSort={sortMusicType}
          suggestionList={musicTypes}
          // suggestionUser
          placeholder={<StyledPlaceholder value="type here" />}
        />
        <EnhancedFormField
          name="years"
          label="Time"
          component={YearInputRange}
          placeholder={<StyledPlaceholder value="type here" />}
          inputRangeOptions={{ parser, serializer, dropValuesRange }}
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
