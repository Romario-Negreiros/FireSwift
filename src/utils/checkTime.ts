import getFormattedData from './getFormattedDate';

const getTimeDifference = (time1: string, time2: string): number => {
  const difference = +time1 - +time2;
  if(difference < 0) {
    return difference * -1;
  } else return difference;
}

const checkTime = (postTime: string): string => {
  const { time: currentTime } = getFormattedData();
  const hoursDifference = getTimeDifference(postTime.slice(0, 2), currentTime.slice(0, 2));
  if(hoursDifference > 24) {
    return '+24h ago'
  } else if(hoursDifference < 1) {
    const minutesDifference = getTimeDifference(postTime.slice(3, 5), currentTime.slice(3, 5));
    if(minutesDifference < 1) {
      const secondsDifference = getTimeDifference(postTime.slice(6, 8), currentTime.slice(6, 8));
      return `${secondsDifference}s ago`
    } else {
      return `${minutesDifference}m ago`
    }
  } else return `${hoursDifference}h ago`
};

export default checkTime;