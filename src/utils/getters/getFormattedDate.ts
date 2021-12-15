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
    date: `${crtYear}/${crtMonth < 10 ? '0' + crtMonth : crtMonth}/${crtDay < 10 ? '0' + crtDay : crtDay}`,
    time: `${crtHours < 10 ? '0' + crtHours : crtHours}:${crtMins < 10 ? '0' + crtMins : crtMins}:${crtSecs < 10 ? '0' + crtSecs : crtSecs}`,
  };
  return formattedDate;
};

export default getFormattedDate;
