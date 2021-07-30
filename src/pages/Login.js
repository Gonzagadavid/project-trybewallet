import { func } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionEmail } from '../actions';
import Input from '../components/Input';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      notValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.checkValidation = this.checkValidation.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkValidation());
  }

  checkValidation() {
    const { email, password } = this.state;
    const minChars = 5;
    const notValid = !(/\w+@\w+.com/.test(email) && password.length > minChars);
    this.setState({ notValid });
  }

  submitData() {
    const { email } = this.state;
    const { submitEmail } = this.props;
    submitEmail(email);
  }

  render() {
    const { email, password, notValid } = this.state;
    return (
      <div>
        <Input
          labelText="Email:"
          type="email"
          id="email-input"
          name="email"
          value={ email }
          change={ this.handleChange }
        />
        <Input
          labelText="Password:"
          type="password"
          id="password-input"
          name="password"
          value={ password }
          change={ this.handleChange }
        />
        <Link to="/carteira">
          <button type="button" onClick={ this.submitData } disabled={ notValid }>
            Entrar
          </button>
        </Link>
      </div>
    );
  }
}

const mapDispachToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(actionEmail(email)),
});

export default connect(null, mapDispachToProps)(Login);

Login.propTypes = {
  submitEmail: func.isRequired,
};
