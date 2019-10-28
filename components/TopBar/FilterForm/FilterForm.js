import Router from 'next/router';
import { useGlobal } from 'reactn';
import { Formik } from 'formik';

import { Box, Button, Text } from 'grommet';
import { FormSearch, FormTrash } from 'grommet-icons';
import { useCallback, useContext } from 'react';

import YearInputRange from './YearInputRange/YearInputRange';
import InputAutosuggestion from './InputAutosuggestion/InputAutosuggestion';
import EnhancedFormField from './EnhancedFormField';
import { StyledTextInput } from './StyledFilterFormComponents';

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

function cleanValuesAndRoute(values, { setSubmitting }) {
  const cleanValues = JSON.parse(
    JSON.stringify(values, (k, v) => (v.length === 0 ? undefined : v))
  );
  if (Object.keys(cleanValues).includes('years')) {
    cleanValues.years = serializer(parser(cleanValues.years, dropValuesRange));
    cleanValues.years = cleanValues.years.replace(/\s/g, '');
  }
  setSubmitting();
  Router.push({ pathname: '/explorer', query: cleanValues });
}

export default function FilterForm() {
  const { prevQuery, small } = useContext(TopBarContext);

  const formFieldNames = ['query', 'musicType', 'country', 'years', 'artist'];

  // filter out any query parameters that do not correspond to a form field
  const prevQueryFormValues = prevQuery
    ? Object.keys(prevQuery)
        .filter(key => formFieldNames.includes(key))
        .reduce((obj, key) => {
          return { ...obj, [key]: prevQuery[key] };
        }, {})
    : { ...prevQuery };

  const [updateFormField, setUpdateFormField] = useGlobal('updateFormField');

  function initSetFieldValue(setFieldValue) {
    if (!updateFormField) {
      setUpdateFormField(setFieldValue);
    }
  }

  const selectText = useCallback(event => {
    event.target.select();
  }, []);

  // construct object from formFieldNames with default value
  const defaultFormValues = formFieldNames.reduce((obj, fieldName) => {
    return { ...obj, [fieldName]: '' };
  }, {});

  const initialValues = {
    ...defaultFormValues,
    ...prevQueryFormValues
  };

  return (
    <Box margin={{ horizontal: '1rem' }}>
      <Formik onSubmit={cleanValuesAndRoute} initialValues={initialValues}>
        {({ values, handleChange, handleSubmit, setFieldValue, setValues }) => {
          initSetFieldValue(setFieldValue);

          const clearForm = () => {
            setValues(defaultFormValues);
          };

          const fieldIsEqualTo = (name, compareObj) => {
            return (
              values[name].replace(/\s/g, '') ===
              compareObj[name].replace(/\s/g, '')
            );
          };

          const formIsEqualToInitial = Object.keys(values).every(field =>
            fieldIsEqualTo(field, initialValues)
          );

          return (
            <form
              onSubmit={event => {
                event.preventDefault();
                handleSubmit();
              }}
            >
              <Box direction="row" justify="between" align="center">
                <EnhancedFormField
                  label="Keyword"
                  placeholder="type here"
                  modified={!fieldIsEqualTo('query', initialValues)}
                >
                  <StyledTextInput
                    name="query"
                    value={values.query}
                    onChange={handleChange}
                    onClick={selectText}
                    hasValue={!fieldIsEqualTo('query', defaultFormValues)}
                    clearInput={() =>
                      setFieldValue('query', defaultFormValues.query)
                    }
                  />
                </EnhancedFormField>
                <EnhancedFormField
                  label="Artist"
                  placeholder="type here"
                  modified={!fieldIsEqualTo('artist', initialValues)}
                >
                  <StyledTextInput
                    name="artist"
                    value={values.artist}
                    onChange={handleChange}
                    onClick={selectText}
                    hasValue={!fieldIsEqualTo('artist', defaultFormValues)}
                    clearInput={() =>
                      setFieldValue('artist', defaultFormValues.artist)
                    }
                  />
                </EnhancedFormField>
                <EnhancedFormField
                  label="Country"
                  placeholder="type here"
                  modified={!fieldIsEqualTo('country', initialValues)}
                >
                  <InputAutosuggestion
                    name="country"
                    onChange={handleChange}
                    value={values.country}
                    hasValue={!fieldIsEqualTo('country', defaultFormValues)}
                    clearInput={() =>
                      setFieldValue('country', defaultFormValues.country)
                    }
                    suggestionSort={sortCountries}
                    suggestionList={countries}
                    // suggestionUser
                  />
                </EnhancedFormField>
                <EnhancedFormField
                  label="Genre"
                  placeholder="type here"
                  modified={!fieldIsEqualTo('musicType', initialValues)}
                >
                  <InputAutosuggestion
                    name="musicType"
                    onChange={handleChange}
                    value={values.musicType}
                    hasValue={!fieldIsEqualTo('musicType', defaultFormValues)}
                    clearInput={() =>
                      setFieldValue('musicType', defaultFormValues.musicType)
                    }
                    suggestionSort={sortMusicType}
                    suggestionList={musicTypes}
                    // suggestionUser
                  />
                </EnhancedFormField>
                <EnhancedFormField
                  label="Time"
                  placeholder="type here"
                  modified={!fieldIsEqualTo('years', initialValues)}
                >
                  <YearInputRange
                    name="years"
                    onChange={handleChange}
                    value={values.years}
                    hasValue={!fieldIsEqualTo('years', defaultFormValues)}
                    clearInput={() =>
                      setFieldValue('years', defaultFormValues.years)
                    }
                    inputRangeOptions={{ parser, serializer, dropValuesRange }}
                  />
                </EnhancedFormField>
                <Box
                  direction={small ? 'row' : 'column'}
                  pad={{ left: '1rem' }}
                  gap="0.5rem"
                  flex="grow"
                >
                  <Button
                    type="submit"
                    label={<Text size="small">Search</Text>}
                    primary
                    icon={<FormSearch />}
                    gap="xsmall"
                    color={!formIsEqualToInitial ? 'accent-4' : 'brand'}
                  />
                  <Button
                    type="reset"
                    onClick={clearForm}
                    label={<Text size="small">Clear</Text>}
                    icon={<FormTrash />}
                    gap="xsmall"
                  />
                </Box>
              </Box>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
}
