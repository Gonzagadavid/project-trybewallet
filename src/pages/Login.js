import React from 'react';
import Input from '../components/Input';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { email, password } = this.state;
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
        <button type="button">Entrar</button>
      </div>
    );
  }
}

export default Login;
