import getFormattedData from '../getters/getFormattedDate';

const getDifference = (n1: string, n2: string): number => {
  const difference = +n1 - +n2;
  if (difference < 0) {
    return difference * -1;
  } else return difference;
};

const checkTime = (postFormattedDate: { date: string; time: string }): string => {
  const currentFormattedDate = getFormattedData();
  const dateDifference = getDifference(
    postFormattedDate.date.slice(0, 2),
    currentFormattedDate.date.slice(0, 2)
  );
  if (dateDifference > 0) {
    return '+24h ago';
  } else {
    const hoursDifference = getDifference(
      postFormattedDate.time.slice(0, 2),
      currentFormattedDate.time.slice(0, 2)
    );
    if (hoursDifference < 1) {
      const minutesDifference = getDifference(
        postFormattedDate.time.slice(3, 5),
        currentFormattedDate.time.slice(3, 5)
      );
      if (minutesDifference < 1) {
        const secondsDifference = getDifference(
          postFormattedDate.time.slice(6, 8),
          currentFormattedDate.time.slice(6, 8)
        );
        return `${secondsDifference}s ago`;
      } else {
        return `${minutesDifference}m ago`;
      }
    } else {
      return `${hoursDifference}h ago`;
    }
  }
};

export default checkTime;
