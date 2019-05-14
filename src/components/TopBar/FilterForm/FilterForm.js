import { Box, Button, Form, FormField, TextInput } from 'grommet';
import YearInputRange from './YearInputRange/YearInputRange';
import GenreInputDrop from './GenreInputDrop/GenreInputDrop';
import CountryInputDrop from './CountryInputDrop/CountryInputDrop';

export default function FilterForm(props) {
  return (
    <Form onSubmit={({ value }) => console.log(value)}>
      <Box direction="row" justify="between" align="center">
        <FormField
          name="keyword"
          label="Keyword"
          component={TextInput}
          placeholder="type here"
        />
        <FormField
          name="artist"
          label="Artist"
          component={TextInput}
          placeholder="type here"
        />
        <FormField
          name="country"
          label="Country"
          component={CountryInputDrop}
          placeholder="type here"
        />
        <FormField
          name="musicType"
          label="Genre"
          component={GenreInputDrop}
          initialValue=""
          placeholder="type here"
        />
        <FormField
          name="year"
          label="Time"
          component={YearInputRange}
          initialValue={[1975]}
          placeholder="type here"
        />
        <Button type="submit" label="Search" />
      </Box>
    </Form>
  );
}
