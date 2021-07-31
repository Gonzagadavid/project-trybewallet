import { arrayOf, func, string } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormWallet from '../components/FormWallet/FormWallet';
import fetchCurrencies from '../reducers/fetchCurrencies';
import fetchExpenses from '../reducers/fetchExpenses';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitData = this.onSubmitData.bind(this);
  }

  componentDidMount() {
    const { fetchMoedas } = this.props;
    fetchMoedas();
  }

  onSubmitData() {
    const { saveData } = this.props;
    saveData({ ...this.state });
    this.setState({ value: 0, description: '', currency: '', method: '', tag: '' });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { emailField, moedas, total } = this.props;
    const { value, currency, description, tag, method } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{emailField}</span>
          <span data-testid="total-field">{total}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <FormWallet
          moedas={ moedas }
          handleChange={ this.handleChange }
          valor={ value }
          descricao={ description }
          moeda={ currency }
          metodo={ method }
          tag={ tag }
          submit={ this.onSubmitData }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  emailField: user.email,
  moedas: wallet.currencies,
  total: wallet.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMoedas: () => dispatch(fetchCurrencies()),
  saveData: (data) => dispatch(fetchExpenses(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  emailField: string.isRequired,
  fetchMoedas: func.isRequired,
  saveData: func.isRequired,
  moedas: arrayOf(string).isRequired,
  total: string,
};

Wallet.defaultProps = {
  total: '0',
};
