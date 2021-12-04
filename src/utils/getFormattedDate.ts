interface funcReturn {
  date: string;
  time: string;
}

const getFormattedDate = (): funcReturn => {
  // crt ==== current
  const d = new Date();
  const crtYear = d.getFullYear();
  const crtDay = d.getDate();
  const crtMonth = d.getMonth() + 1;
  const crtHours = d.getHours();
  const crtMins = d.getMinutes();
  const crtSecs = d.getSeconds();
  const formattedDate = {
    date: `${crtYear}/${crtMonth}/${crtDay}`,
    time: `${crtHours}:${crtMins}:${crtSecs}`,
  };
  return formattedDate;
};

export default getFormattedDate;
