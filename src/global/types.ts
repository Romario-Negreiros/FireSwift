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

type Reaction = {
  id: string,
  reaction: string,
}

export interface Post {
  id: string;
  author: string;
  authorID: string;
  date: string;
  time: string;
  content: string;
  reactions: Reaction[];
  media: {
    images: string[];
    videos: string[];
    docs: {
      url: string;
      name: string;
    }[];
  };
  comments: {
    authorID: string;
    author: string;
    content: string;
    reactions: Reaction[];
    replies: {
      authorID: string;
      author: string;
      content: string;
      reactions: Reaction[];
    }[];
  }[];
}

export interface ModalsProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  user: User;
}
