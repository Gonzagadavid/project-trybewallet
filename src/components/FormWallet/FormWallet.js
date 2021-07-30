import React from 'react';
import { arrayOf, func, string } from 'prop-types';
import Select from '../Select';
import Input from '../Input';
import { inputs, selects } from '../../data/wallet';

const FormWallet = (props) => {
  const { moedas, moeda, handleChange } = props;
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
        id="moeda"
        name="moeda"
        value={ moeda }
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
    </form>
  );
};

FormWallet.propTypes = {
  moedas: arrayOf(string).isRequired,
  moeda: string.isRequired,
  handleChange: func.isRequired,
};

export default FormWallet;
