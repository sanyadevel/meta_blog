const formatDate = (timestamp = ''):string => {
  const date:Date = new Date(timestamp);

  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month: string = monthNames[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
export { formatDate };
