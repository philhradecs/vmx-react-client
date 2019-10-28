import React, { useContext, useState } from 'react';
import { useGlobal } from 'reactn';
import { Box, Form } from 'grommet';
import { Formik } from 'formik';
import TopBarContext from '../context';

export default function EnhancedForm({ children, direction, ...props }) {
  const { prevQuery, small } = useContext(TopBarContext);
  // const [formValues, setFormValues] = useGlobal('formValues');
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(prevQuery);
  console.log('formValues: ', formValues);

  return (
    <Formik {...props}>
      {({
        values,
        handleChange,
        handleSubmit,
        setFieldValue,
        setFieldTouched
      }) => {
        const onChange = event => {
          const targetEl = event.target;
          const { fieldName } = targetEl;
          setFormValues({
            ...formValues,
            [fieldName]: targetEl.value
          });
          return handleChange(event);
        };

        return (
          <form
            onSubmit={event => {
              event.preventDefault();
              setSubmitted(true);
              handleSubmit();
            }}
          >
            <Box direction={direction} justify="between" align="center">
              {React.Children.map(children, child => {
                return React.cloneElement(child, {
                  prevQuery,
                  small,
                  onChange
                });
              })}
            </Box>
          </form>
        );
      }}
    </Formik>
  );
}
