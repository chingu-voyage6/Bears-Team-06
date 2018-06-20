import React from 'react';
import { connect } from 'react-redux';

import { signIn } from 'modules/auth';
import { Button, TextInput } from 'lib';

class SignInPage extends React.Component {
  state = {
    username: '',
    password: '',
  };

  submit = () => {
    this.props.signIn(this.state);
  };

  render() {
    return (
      <div>
        <TextInput
          label="Username"
          value={this.state.value}
          onChange={e => this.setState({ username: e.target.value })}
        />
        <TextInput
          label="Password"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        {this.props.error && <p>{this.props.error}</p>}
        <Button onClick={this.submit}>Sign in</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { error: state.auth.error };
};

export default connect(
  mapStateToProps,
  { signIn },
)(SignInPage);
