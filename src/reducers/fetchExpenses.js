import { getExpensesError, getExpensesSucess } from '../actions';

const fetchExpenses = (userData) => async (dispach) => {
  const respJson = await fetch('https://economia.awesomeapi.com.br/json/all');
  if (!respJson.ok) return dispach(getExpensesError);
  const currenciesData = await respJson.json();
  const total = (+userData.value * +currenciesData[userData.currency].ask);
  dispach(getExpensesSucess(
    { expense: { ...userData, exchangeRates: currenciesData }, total },
  ));
};

export default fetchExpenses;
