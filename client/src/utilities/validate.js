const validate = values => {
  const errors = {};

  Object.entries(values).forEach(([type, value]) => {
    const errorMessage = checkError(type, value, values);
    if (errorMessage !== '') {
      errors[type] = errorMessage;
    }
  });

  return errors;
};

const checkError = (type, value, values) => {
  switch (type) {
    case 'email':
      return validateEmail(value);
    case 'username':
      return validateUsername(value);
    case 'password':
      return validatePassword(value);
    case 'confirmPassword':
      return validateconfirmPassword(value, values.password);
    default:
      console.error(`ERROR: "${type}" cannot be validated.`);
      return '';
  }
};

const validateEmail = email => {
  let errorMessage = '';

  if (!email) {
    errorMessage = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    errorMessage = 'Invalid email address';
  }

  return errorMessage;
};

const validatePassword = password => {
  let errorMessage = '';

  if (!password) {
    errorMessage = 'Required';
  } else if (password.length < 6) {
    errorMessage = 'Password must be at least 6 characters';
  }

  return errorMessage;
};

const validateconfirmPassword = (confirmPassword, password) => {
  let errorMessage = '';

  if (!confirmPassword) {
    errorMessage = 'Required';
  } else if (confirmPassword !== password) {
    errorMessage = 'Password and confirmed password doesn\'t match';
  }

  return errorMessage;
};

const validateUsername = username => {
  let errorMessage = '';

  if (!username) {
    errorMessage = 'Required';
  } else if (username.length < 3) {
    errorMessage = 'Username must be at least 3 characters';
  }

  return errorMessage;
};

export default validate;
