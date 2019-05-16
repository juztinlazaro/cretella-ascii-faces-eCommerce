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

export const timeDifference = (previous: string) => {
  const current: any = new Date();
  const date = Date.parse(previous);
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;

  const elapsed = current - date;
  const days = Math.round(elapsed / msPerDay);
  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth && days < 7) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else {
    const dateFormated = `${new Date(date).getMonth()}/
    ${new Date(date).getDate()}/
    ${new Date(date).getFullYear()}`;
    return dateFormated;
  }
};
