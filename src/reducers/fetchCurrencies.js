import { getCurrenciesError, getCurrenciesSucess } from '../actions';

const fetchCurrencies = () => async (dispach) => {
  const respJson = await fetch('https://economia.awesomeapi.com.br/json/all');
  if (!respJson.ok) return dispach(getCurrenciesError());
  const currenciesObj = await respJson.json();
  const currencies = Object
    .keys(currenciesObj)
    .filter((currency) => currency !== 'USDT');
  dispach(getCurrenciesSucess(currencies));
};

export default fetchCurrencies;
