import { arrayOf, func, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet/FormWallet';
import fetchCurrencies from '../reducers/fetchCurrencies';

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

  componentDidMount() {
    const { fetchMoedas } = this.props;
    fetchMoedas();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { emailField, moedas } = this.props;
    const { valor, moeda, descricao, tag, metodo } = this.state;
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

const mapStateToProps = ({ user, wallet }) => ({
  emailField: user.email,
  moedas: wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMoedas: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  emailField: string.isRequired,
  fetchMoedas: func.isRequired,
  moedas: arrayOf(string).isRequired,
};
