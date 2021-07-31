import { arrayOf, func, objectOf } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../../actions';
import expenseTable from '../../data/expenseTable';

const ExpenseTable = (props) => {
  const { expenses, remove, enableEdit } = props;
  return (
    <table>
      <thead>
        <tr>
          {expenseTable.map((item) => <th key={ item }>{item}</th>)}
        </tr>
      </thead>
      <tbody>
        {expenses.map((
          { description, tag, method, value, currency, exchangeRates, id },
        ) => {
          const { name, ask } = exchangeRates[currency];
          const total = (+value * +ask).toFixed(2);
          const askRound = (Math.round((ask * 100)) / 100).toFixed(2);
          return (
            <tr key={ id }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{value}</td>
              <td>{name}</td>
              <td>{askRound}</td>
              <td>{total}</td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => enableEdit(id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => remove(id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);

ExpenseTable.propTypes = {
  expenses: arrayOf(objectOf).isRequired,
  remove: func.isRequired,
  enableEdit: func.isRequired,
};
