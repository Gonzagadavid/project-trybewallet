import { combineReducers } from 'redux';
import user from './user';
// import wallet from './wallet';

const reducer = combineReducers({ user });
export default reducer;
// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
