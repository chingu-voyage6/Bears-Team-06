import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
// UIs
import AuthLayout from 'layouts/AuthLayout';
import Form from './components/Form';
// Misc
import { signUp, SIGN_UP } from 'modules/user';
import { loadingSelector, errorMessageSelector } from 'modules/selectors';
import validate from 'utilities/validate';

class SignUpPage extends React.Component {
  submit = (values, actions) => {
    this.props
      .signUp(values)
      .then(() => actions.setSubmitting(false))
      .catch(() => actions.setSubmitting(false));
  };

  render() {
    const { loading, errorMessage } = this.props;

    return (
      <AuthLayout>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={this.submit}
        >
          {props => (
            <Form {...props} isLoading={loading} errorMessage={errorMessage} />
          )}
        </Formik>
      </AuthLayout>
    );
  }
}

export default connect(
  state => ({
    loading: loadingSelector([SIGN_UP])(state),
    errorMessage: errorMessageSelector([SIGN_UP])(state),
  }),
  { signUp },
)(SignUpPage);
