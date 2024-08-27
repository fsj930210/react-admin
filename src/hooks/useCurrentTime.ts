import { useState } from 'react';

type DateInfo = {
  year: string;
  month: string;
  day: string;
  date: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
};
function getCurrentDate(): DateInfo {
  const currentDate = new Date();
  const year = `${currentDate.getFullYear()}`;
  const month = `${currentDate.getMonth() + 1}`;
  const day = `${currentDate.getDay()}`;
  const date = `${currentDate.getDate()}`;
  const hours = `${currentDate.getHours()}`;
  const minutes = `${currentDate.getMinutes()}`;
  const seconds = `${currentDate.getSeconds()}`;
  const milliseconds = `${currentDate.getMilliseconds()}`;
  return {
    year,
    month,
    day,
    date,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}

const useCurrentTime = (interval = 1000) => {
  const [dateInfo, setDateInfo] = useState<DateInfo>(getCurrentDate());
  setInterval(() => {
    const dateInfo = getCurrentDate();
    setDateInfo(dateInfo);
  }, interval);
  return dateInfo;
};

export default useCurrentTime;
