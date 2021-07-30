import { string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet/FormWallet';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      valor: 0,
      descricao: '',
      moeda: '',
      moedas: [''],
      metodo: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchMoedas = this.fetchMoedas.bind(this);
  }

  componentDidMount() {
    this.fetchMoedas();
  }

  async fetchMoedas() {
    const respJson = await fetch('https://economia.awesomeapi.com.br/json/all');
    const moedasObj = await respJson.json();
    const moedas = Object.keys(moedasObj).filter((moeda) => moeda !== 'USDT');
    this.setState({ moedas });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { emailField } = this.props;
    const { moedas, valor, moeda, descricao, tag, metodo } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{emailField}</span>
          <span data-testid="total-field">0</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <FormWallet
          moedas={ moedas }
          handleChange={ this.handleChange }
          valor={ valor }
          descricao={ descricao }
          moeda={ moeda }
          metodo={ metodo }
          tag={ tag }
        />
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
