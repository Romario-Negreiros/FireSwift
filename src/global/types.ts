import { Unsubscribe } from "firebase/firestore";

export interface Props {
  toggleTheme: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  friends: string[];
  picture: string;
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
  chats: {
    id: string;
    receiverID: string;
  }[];
}

type Reaction = {
  id: string;
  reaction: string;
};

interface Medias {
  images: string[];
  videos: string[];
  docs: {
    url: string;
    name: string;
  }[];
}

export interface Post {
  id: string;
  author: string;
  authorID: string;
  formattedDate: {
    date: string;
    time: string;
  };
  content: string;
  reactions: Reaction[];
  media: Medias;
  comments: {
    id: string;
    author: Pick<User, 'id' | 'name' | 'picture'>;
    content: string;
    reactions: Reaction[];
    formattedDate: {
      date: string;
      time: string;
    };
    replies: {
      id: string;
      author: Pick<User, 'id' | 'name' | 'picture'>;
      content: string;
      reactions: Reaction[];
      formattedDate: {
        date: string;
        time: string;
      };
    }[];
  }[];
}

export interface Result {
  id: string;
  name: string;
  picture: string;
  chats: {
    id: string;
    receiverID: string;
  }[];
  type: string;
}

export interface Message {
  id: string;
  user: {
    id: string;
    name: string;
    picture: string;
  };
  text: string;
  viewed: boolean;
  sentDate: {
    date: string;
    time: string;
  };
}

export interface Chat {
  id: string;
  users: {
    id: string;
    name: string;
    picture: string;
    chats: {
      id: string;
      receiverID: string;
    }[];
  }[];
  messages: Message[];
  creationDate: {
    date: string;
    time: string;
  };
  unsubscribe?: Unsubscribe
}

export interface ModalsProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  user: User;
}
