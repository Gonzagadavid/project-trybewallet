export const inputs = [
  {
    labelText: 'Valor',
    id: 'value-input',
    type: 'number',
    name: 'value',
  },
  {
    labelText: 'Descrição',
    id: 'description-input',
    type: 'text',
    name: 'description',
  },
];

export const selects = [
  {
    labelText: 'Método de pagamento',
    id: 'method-input',
    name: 'method',
    options: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  },
  {
    labelText: 'Tag',
    id: 'tag-input',
    name: 'tag',
    options: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  },
];
