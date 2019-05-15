export const onActionString = (action: any) => {
  return action.toString();
};

export const numberWithCommas = (value: number) => {
  if (value === undefined) {
    return 0;
  }
  const toDecimal = value.toFixed(2);
  return `$${toDecimal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};
