import React from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import Select from '../Select';
import Input from '../Input';
import { inputs, selects } from '../../data/wallet';

const FormWallet = (props) => {
  const { moedas, currency, handleChange, submit, edit, onEdit } = props;
  return (
    <form>
      { inputs.map(({ labelText, type, id, name }) => (<Input
        labelText={ labelText }
        type={ type }
        id={ id }
        name={ name }
        value={ props[name] }
        change={ handleChange }
        key={ id }
      />))}
      <Select
        labelText="Moeda"
        id="currency-input"
        name="currency"
        value={ currency }
        change={ handleChange }
        options={ moedas }
      />
      {selects.map(({ labelText, options, id, name }) => (<Select
        labelText={ labelText }
        id={ id }
        name={ name }
        value={ props[name] }
        change={ handleChange }
        options={ options }
        key={ id }
      />))}
      {
        edit ? <button type="button" onClick={ onEdit }>Editar despesa</button>
          : <button type="button" onClick={ submit }>Adicionar despesa</button>
      }
    </form>
  );
};

FormWallet.propTypes = {
  moedas: arrayOf(string).isRequired,
  currency: string.isRequired,
  handleChange: func.isRequired,
  submit: func.isRequired,
  edit: bool.isRequired,
  onEdit: func.isRequired,
};

export default FormWallet;
