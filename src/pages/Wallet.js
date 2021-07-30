import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/Input';
import Select from '../components/Select';
import { inputs, selects } from '../data/wallet';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      valor: 0,
      descricao: '',
      moeda: '',
      metodo: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.checkValidation());
  }

  render() {
    const { emailField } = this.props;
    const { state } = this;
    return (
      <div>
        <header>
          <span data-testid="email-field">{emailField}</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <form>
          { inputs.map(({ labelText, type, id, name }) => (<Input
            labelText={ labelText }
            type={ type }
            id={ id }
            name={ name }
            value={ state[name] }
            change={ this.handleChange }
            key={ id }
          />))}
          <Select
            labelText="Moeda"
            id="moeda"
            name="moeda"
            value={ state.moeda }
            change={ this.handleChange }
            options={ [''] }
          />
          {selects.map(({ labelText, options, id, name }) => (<Select
            labelText={ labelText }
            id={ id }
            name={ name }
            value={ state[name] }
            change={ this.handleChange }
            options={ options }
            key={ id }
          />))}
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  emailField: user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  emailField: string.isRequired,
};
