const GetUserListData = (lists: string[]) => {
  const data: any = {};
  lists.forEach(item => {
    const ul = document.querySelector(`.userList-${item}`) as HTMLUListElement;
    const children = Array.from(ul.children);
    data[item] = children.map(child => {        
      return {
        name: child.firstElementChild?.innerHTML,
      };
    });
  });
  return data;
};

export default GetUserListData;
