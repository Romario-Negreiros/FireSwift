interface funcReturn {
  images: any[];
  videos: any[];
  docs: any[];
}

const getInputItems = (inputsIDs: string[]): funcReturn => {
  const inputItems: funcReturn = {
    images: [],
    videos: [],
    docs: [],
  };

  inputsIDs.forEach(id => {
    const input = document.querySelector(`#${id}`) as HTMLInputElement;
    if (input.files) {
      const { files } = input;
      if (files.length) {
        const filesArray = Array.from(files);
        filesArray.forEach(file => {
          if (id.includes('img')) inputItems.images.push(file);
          else if (id.includes('doc')) inputItems.docs.push(file);
          else inputItems.videos.push(file);
        });
      }
    }
  });

  return inputItems;
};

export default getInputItems;
