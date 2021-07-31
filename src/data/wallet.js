export const inputs = [
  {
    labelText: 'Valor',
    id: 'valor',
    type: 'number',
    name: 'value',
  },
  {
    labelText: 'Descrição',
    id: 'descricao',
    type: 'text',
    name: 'description',
  },
];

export const selects = [
  {
    labelText: 'Método de pagamento',
    id: 'metodo',
    name: 'method',
    options: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
  },
  {
    labelText: 'Tag',
    id: 'tag',
    name: 'tag',
    options: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
  },
];
