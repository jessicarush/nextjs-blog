import { parseISO, format } from 'date-fns';

function DateString({ dateString }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'MMMM d, yyyy')}</time>;
}

export default DateString;