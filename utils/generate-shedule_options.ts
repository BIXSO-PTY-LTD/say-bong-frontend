import { format, addDays, subDays } from 'date-fns';
import { fDate } from './format-time';
type Option = {
  value: string;
  label: string;
};
// Function to format date as "dd/mm"
const formatDate = (date: Date) => format(date, 'dd/MM');

// Function to generate options array
export const generateOptions = (options: Option[]): Option[] => {
  const today = new Date();
  const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const getDayOfWeek = (date: Date) => {
    const daysOfWeek = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    return daysOfWeek[date.getDay()];
  }
  const nextFourDays = Array.from({ length: 4 }, (_, index) => {
    const nextDay = addDays(today, index + 2);
    const dayName = daysOfWeek[nextDay.getDay()];
    return {
      value: fDate(nextDay),
      label: `${formatDate(nextDay)}\n${dayName}`,
    };
  });
  options.map((option) => {
    switch (option.value) {
      case 'yesterday':
        option.label = `Hôm qua\n${getDayOfWeek(subDays(today, 1))}`;
        break;
      case 'today':
        option.label = `Hôm nay\n${getDayOfWeek(today)}`;
        break;
      case 'tomorrow':
        option.label = `Ngày mai\n${getDayOfWeek(addDays(today, 1))}`;
        break;
    }
  })

  const allOptions = [...options, ...nextFourDays];
  return allOptions;
};

export default generateOptions;