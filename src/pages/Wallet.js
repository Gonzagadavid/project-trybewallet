import { arrayOf, func, string, objectOf } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExpenseTable from '../components/ExpenseTable/ExpenseTable';
import FormWallet from '../components/FormWallet/FormWallet';
import fetchCurrencies from '../reducers/fetchCurrencies';
import fetchExpenses from '../reducers/fetchExpenses';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitData = this.onSubmitData.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
  }

  componentDidMount() {
    const { fetchMoedas } = this.props;
    fetchMoedas();
  }

  onSubmitData() {
    const { saveData } = this.props;
    saveData({ ...this.state });
    this.setState({
      value: 0, description: '', currency: 'USD', method: 'Dinheiro', tag: '',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  calcTotal() {
    const { expenses } = this.props;
    if (!expenses.length) return '0';
    const total = expenses
      .map(({ value, exchangeRates, currency }) => +exchangeRates[currency].ask * +value)
      .reduce((valueTotal, valueCurrent) => valueTotal + valueCurrent, 0);

    return total.toFixed(2);
  }

  render() {
    const { emailField, moedas } = this.props;
    const { value, currency, description, tag, method } = this.state;
    return (
      <div>
        <header>
          <span data-testid="email-field">{emailField}</span>
          <span data-testid="total-field">{this.calcTotal()}</span>
          <span data-testid="header-currency-field">BRL</span>
        </header>
        <FormWallet
          moedas={ moedas }
          handleChange={ this.handleChange }
          value={ value }
          description={ description }
          currency={ currency }
          method={ method }
          tag={ tag }
          submit={ this.onSubmitData }
        />
        <ExpenseTable />
      </div>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  emailField: user.email,
  moedas: wallet.currencies,
  expenses: wallet.expenses,
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
  expenses: arrayOf(objectOf),
};

Wallet.defaultProps = {
  expenses: [],
};
