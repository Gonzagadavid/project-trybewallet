import React from 'react';
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
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkValidation());
  }

  checkValidation() {
    const { email, password } = this.state;
    const minChars = 5;
    const validation = !(/\w+@\w+.com/.test(email) && password.length > minChars);
    this.setState({ notValid: validation });
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
          labelText="Password::"
          type="password"
          id="password-input"
          name="password"
          value={ password }
          change={ this.handleChange }
        />
        <button type="button" disabled={ notValid }>Entrar</button>
      </div>
    );
  }
}

export default Login;
