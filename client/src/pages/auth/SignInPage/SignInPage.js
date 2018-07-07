import React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';

// UIs
import AuthLayout from 'layouts/AuthLayout';
import Form from './components/Form';

// Misc
import { signIn, SIGN_IN } from 'modules/user';
import { loadingSelector } from 'modules/selectors';
import validate from 'utilities/validate';

class SignInPage extends React.Component {
  submit = (values, actions) => {
    this.props.signIn({ values, actions });
  };

  render() {
    return (
      <AuthLayout>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validate={validate}
          onSubmit={this.submit}
        >
          {props => <Form {...props} isLoading={this.props.loading} />}
        </Formik>
      </AuthLayout>
    );
  }
}

export default connect(
  state => ({ loading: loadingSelector([SIGN_IN])(state) }),
  { signIn },
)(SignInPage);
