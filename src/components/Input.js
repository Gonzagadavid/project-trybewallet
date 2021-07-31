import { func, string, number, oneOfType } from 'prop-types';
import React from 'react';

const Input = (props) => {
  const { labelText, id, value, change, type, name } = props;

  return (
    <label htmlFor={ id }>
      {labelText}
      <input
        type={ type }
        id={ id }
        data-testid={ id }
        value={ value }
        onChange={ change }
        name={ name }
      />
    </label>
  );
};

Input.propTypes = {
  labelText: string.isRequired,
  id: string.isRequired,
  value: oneOfType([number, string]),
  change: func.isRequired,
  type: string.isRequired,
  name: string.isRequired,
};

Input.defaultProps = {
  value: 'Not found',
};

export default Input;
