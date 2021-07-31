import { arrayOf, func, string, objectOf } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editExpense } from '../actions';
import ExpenseTable from '../components/ExpenseTable/ExpenseTable';
import FormWallet from '../components/FormWallet/FormWallet';
import fetchCurrencies from '../fetchAPI/fetchCurrencies';
import fetchExpenses from '../fetchAPI/fetchExpenses';

class Wallet extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      edit: false,
      idEdit: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmitData = this.onSubmitData.bind(this);
    this.calcTotal = this.calcTotal.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
  }

  componentDidMount() {
    const { fetchMoedas } = this.props;
    fetchMoedas();
  }

  onSubmitData() {
    const { saveData } = this.props;
    const { value, description, currency, method, tag } = this.state;
    saveData({ value, description, currency, method, tag });
    this.setState({
      value: 0, description: '', currency: 'USD', method: 'Dinheiro', tag: '',
    });
  }

  onEdit() {
    const { expenseEdit } = this.props;
    const { value, description, currency, method, tag, idEdit } = this.state;
    expenseEdit({ id: idEdit, value, description, currency, method, tag });
    this.setState({
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: '',
      edit: false,
      idEdit: '',
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  enableEdit(idEdit) {
    const { expenses } = this.props;
    const expenseEdit = expenses.find(({ id }) => id === idEdit);
    const { value, description, currency, method, tag } = expenseEdit;
    this.setState({ value, description, currency, method, tag, edit: true, idEdit });
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
    const { value, currency, description, tag, method, edit } = this.state;
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
          edit={ edit }
          onEdit={ this.onEdit }
        />
        <ExpenseTable enableEdit={ this.enableEdit } />
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
  expenseEdit: (data) => dispatch(editExpense(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

Wallet.propTypes = {
  emailField: string.isRequired,
  fetchMoedas: func.isRequired,
  saveData: func.isRequired,
  moedas: arrayOf(string).isRequired,
  expenses: arrayOf(objectOf),
  expenseEdit: func.isRequired,
};

Wallet.defaultProps = {
  expenses: [],
};
