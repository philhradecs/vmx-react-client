import { Box, Button, Form, FormField, TextInput } from 'grommet';
import Router from 'next/router';
import YearInputRange from './YearInputRange/YearInputRange';
import InputAutosuggestion from './InputAutosuggestion/InputAutosuggestion';
import musicTypes from './InputAutosuggestion/data/discogsMusicTypes190510';
import countries from './InputAutosuggestion/data/countryList';
import { parser, serializer } from './YearInputRange/lib/parserSerializer';

const sortMusicType = (a, b) => {
  if (b.value === 'genre') {
    return 1;
  }
  return a.label > b.label;
};

export default function FilterForm({ initialFormValues }) {
  function handleSubmit(event) {
    const cleanValues = JSON.parse(
      JSON.stringify(event.value, (k, v) => (v.length === 0 ? undefined : v))
    );
    Router.push({ pathname: '/explorer', query: cleanValues });
  }

  return (
    <Form onSubmit={handleSubmit} value={initialFormValues}>
      <Box direction="row" justify="between" align="center">
        <FormField
          name="query"
          label="Keyword"
          component={TextInput}
          onClick={event => event.target.select()}
          placeholder="type here"
        />
        <FormField
          name="artist"
          label="Artist"
          component={TextInput}
          onClick={event => event.target.select()}
          placeholder="type here"
        />
        <FormField
          name="country"
          label="Country"
          component={InputAutosuggestion}
          suggestionSort={() => {}}
          suggestionList={countries}
          suggestionUser
          placeholder="type here"
        />
        <FormField
          name="musicType"
          label="Genre"
          component={InputAutosuggestion}
          suggestionSort={sortMusicType}
          suggestionList={musicTypes}
          suggestionUser
          placeholder="type here"
        />
        <FormField
          name="years"
          label="Time"
          component={YearInputRange}
          dropValuesRange={[1900, 2019]}
          dropEntries={10}
          placeholder="1970 - 1979"
          parser={parser}
          serializer={serializer}
        />
        <Button type="submit" label="Search" />
      </Box>
    </Form>
  );
}
