import {
  CURRENCIES_ERROR, CURRENCIES_SUCESS, EXPENSES_ERROR, EXPENSES_SUCESS, REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  error: '',
  total: '0',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES_SUCESS:
    return { ...state, currencies: action.state, erro: '' };

  case CURRENCIES_ERROR:
    return { ...state, error: 'Ocorreu um erro com a busca da moedas' };

  case EXPENSES_SUCESS:
    return {
      ...state,
      expenses: [
        ...state.expenses, { id: state.expenses.length, ...action.state.expense },
      ],
      total: (+state.total + +action.state.total).toFixed(2),
      error: '',
    };

  case EXPENSES_ERROR:
    return { ...state, error: 'Ocorreu um erro com a busca dos valores' };

  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.state.id),
      total: (+state.total - +action.state.total).toFixed(2),
    };

  default: return state;
  }
};

export default walletReducer;
