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

export const onFormatRelativeDate = (previous: string) => {
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
    const dateFormat = new Date(date).getDate();
    const dateMonth = new Date(date).getMonth();
    const dateYear = new Date(date).getFullYear();
    const dateFormated = `${dateMonth}/${dateFormat}/${dateYear}`;
    return dateFormated;
  }
};

export const onComputeEndScroll = (element: any) => {
  const height = element.scrollHeight;
  const container = element.clientHeight;
  const position = element.scrollTop;
  const finalHeight = height - container;

  return finalHeight <= Math.ceil(position);
};
