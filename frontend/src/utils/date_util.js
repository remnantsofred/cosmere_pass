export const formatDate = date => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = months[obj.getUTCMonth()];
  const day = obj.getUTCDate();
  const year = obj.getUTCFullYear();
  return `${month} ${day}, ${year}`;
};

export const formatDateShort = date => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = months[obj.getUTCMonth()];
  const day = obj.getUTCDate();
  const year = obj.getUTCFullYear();
  return `${obj.getUTCMonth() + 1}/${day}/${year}`;
};

export const formatDateInput = date => {
const months = {
  0: '01',
  1: '02',
  2: '03',
  3: '04',
  4: '05',
  5: '06',
  6: '07',
  7: '08',
  8: '09',
  9: '10',
  10: '11',
  11: '12',
};
const days = {
  1: '01',
  2: '02',
  3: '03',
  4: '04',
  5: '05',
  6: '06',
  7: '07',
  8: '08',
  9: '09',
  0: '00'
};
  const obj = new Date(date);
  const month = months[obj.getUTCMonth()];
  const day = obj.getUTCDate() < 10 ? days[obj.getUTCDate()] : obj.getUTCDate()
  const year = obj.getUTCFullYear();
  return `${year}-${month}-${day}`;
};

export const formatDateWithDay = date => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = months[obj.getUTCMonth()];
  const day = obj.getUTCDate();
  const year = obj.getUTCFullYear();
  const dayOfWeek = daysOfWeek[obj.getUTCDay()];
  return `${dayOfWeek}, ${month} ${day}`;
};

export const formatDateWithDayShort = date => {
  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };
  const daysOfWeek = {
    0: 'Sun',
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
  };
  const obj = new Date(date);

  const month = months[obj.getUTCMonth()];
  const day = obj.getUTCDate();
  const year = obj.getUTCFullYear();
  const dayOfWeek = daysOfWeek[obj.getUTCDay()];
  return `${dayOfWeek}, ${month} ${day}`;
};

export const formatDateWithDayShortAlt = date => {
  const months = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'Jun',
    6: 'Jul',
    7: 'Aug',
    8: 'Sep',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  };
  const daysOfWeek = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
  };
  const obj = new Date(date);
  const month = obj.getUTCMonth() + 1;
  const day = obj.getUTCDate();
  const year = obj.getUTCFullYear();
  const dayOfWeek = daysOfWeek[obj.getUTCDay()];
  return `${dayOfWeek}, ${month}/${day}`;
};

export const formatDateWithMonth = date => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };
  const obj = new Date(date);
  const month = months[obj.getUTCMonth()];
  return `${month}`;
};


export const formatTime = date => {
  const obj = new Date(date);
  const fullHours = obj.getUTCHours();
  let hours = fullHours % 12;
  if (hours === 0) hours = 12;
  const minutes = obj.getUTCMinutes();
  const tmp = `0${minutes}`;
  const paddedMinutes = tmp.slice(tmp.length - 2);
  const ampm = fullHours < 12 || fullHours === 0 ? 'AM' : 'PM';
  return `${hours}:${paddedMinutes} ${ampm}`;
};

export const addWeek = (date, n) => {
  const obj = new Date(date);
  obj.setDate(obj.getDate() + 7 * n)
  return obj
};

export const addMonth = (date, n) => {
  const obj = new Date(date);
  obj.setMonth(obj.getMonth() + 1 * n)
  return obj
};

export const formatDateTime = date => (
  `${formatDate(date)} ${formatTime(date)}`
);

export const moreRecentOrEqualThanDate = (date1, date2) =>{
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  return (d1 >= d2) ? true : false
}

export const timeBetween = (date1, date2) => {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  let timeDiff = Math.abs(d2.getTime() - d1.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays * 60;
}

export const timeBetweenShort = (date1, date2) => {
  let d1 = new Date(date1);
  let d2 = new Date(date2);
  let timeDiff = Math.abs(d2.getTime() - d1.getTime());
  let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays * 60;
}

export const dateFromString = (stringDate) => {
  const [year, month, day] = stringDate.split("-")
  const date = new Date(parseInt(year), parseInt(month), parseInt(day))
  return date
}