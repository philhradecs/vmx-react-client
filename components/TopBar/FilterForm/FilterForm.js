import { Box, Button, Form, FormField, TextInput } from 'grommet';
import YearFormField from './YearFieldDropdown/YearFormField';
import GenreSearchDropdown from './GenreDropdown';

function FilterForm(props) {
  return (
    <Form>
      <Box direction="row" justify="between" align="center">
        <FormField name="keyword" label="Keyword">
          <TextInput placeholder="type here" />
        </FormField>
        <FormField name="artist" label="Artist">
          <TextInput placeholder="type here" />
        </FormField>
        <FormField name="country" label="Country">
          <TextInput placeholder="type here" />
        </FormField>
        <FormField name="genre" label="Genre">
          <TextInput placeholder="type here" />
          {/* <GenreSearchDropdown /> */}
        </FormField>
        <YearFormField presetYears={[1980]} />
        <Button type="submit" label="Search" />
      </Box>
    </Form>
  );
}

export default FilterForm;
