export const USER_EMAIL = 'USER_EMAIL';
export const CURRENCIES = 'CURRENCIES';
export const CURRENCIES_SUCESS = 'CURRENCIES_SUCESS';
export const CURRENCIES_ERROR = 'CURRENCIES_ERROR';
export const EXPENSES_SUCESS = 'EXPENSES_SUCESS';
export const EXPENSES_ERROR = 'EXPENSES_ERROR';

export const actionEmail = (state) => ({ type: USER_EMAIL, state });

export const getCurrenciesSucess = (state) => ({ type: CURRENCIES_SUCESS, state });
export const getCurrenciesError = ({ type: CURRENCIES_ERROR });

export const getExpensesSucess = (state) => ({ type: EXPENSES_SUCESS, state });
export const getExpensesError = ({ type: EXPENSES_SUCESS });
