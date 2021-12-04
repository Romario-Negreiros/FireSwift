export interface Props {
  toggleTheme: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  friends: string[];
  picture?: string;
  hasPicture: boolean;
  bio: string;
  age: number | null;
  relationship: string;
  isPrivate: boolean;
  country: string;
  languages: {
    name: string;
  }[];
  hobbies: {
    name: string;
  }[];
}

export interface Post {
  id: string;
  author: string;
  date: string;
  time: string;
  content: string;
}

export interface ModalsProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  user: User;
}
