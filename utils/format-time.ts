import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'HH:mm - dd/MM';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
      addSuffix: true,
    })
    : '';
}
export function formatStringToDateTime(dateTimeString: string) {
  const [datePart, timePart] = dateTimeString.split("T");
  const [day, month, year] = datePart.split("-");
  const [hours, minutes] = timePart.split(":");
  const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}`;

  return new Date(formattedDateString);
}

export const convertTimestampToDate = (timestamp: number) => {
  return new Date(timestamp * 1000);
};