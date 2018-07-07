import React from 'react';
import styled from 'styled-components';
import Spinner from 'elements/Spinner';

const InnerForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  isLoading,
}) => (
  <Form onSubmit={handleSubmit}>
    <InputContainer>
      <label>Email</label>
      <Input
        type="email"
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.email}
      />
      {touched.email && errors.email && <div>{errors.email}</div>}
    </InputContainer>
    <InputContainer>
      <label>Password</label>
      <Input
        type="password"
        name="password"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.password}
      />
      {touched.password && errors.password && <div>{errors.password}</div>}
    </InputContainer>
    <button type="submit" disabled={isSubmitting || !isEmpty(errors)}>
      Submit
    </button>
    {isLoading && <Spinner size="s" />}
  </Form>
);

export default InnerForm;

const isEmpty = obj => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20%;
`;

const InputContainer = styled.div`
  width: 80%;
`;

const Input = styled.input`
  display: block;
  width: 100%;
`;
