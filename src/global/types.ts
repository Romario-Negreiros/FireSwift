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
    chatID: string;
    receiverID: string;
  }[];
}

type Reaction = {
  id: string;
  reaction: string;
};

type Medias = {
  images: string[];
  videos: string[];
  docs: {
    url: string;
    name: string;
  }[];
};

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
    chatID: string;
    receiverID: string;
  }[];
  type: string;
}

export enum MessageStates {
  sent = 'SENT',
  viewed = 'VIEWED',
}

export interface Chat {
  chatID: string;
  chatCreation: {
    date: string;
    time: string;
  };
  users: {
    id: string;
    name: string;
    picture: string;
    chats: {
      chatID: string;
      receiverID: string;
    }[];
  }[];
  messages: {
    userID: string;
    id: string;
    text: string;
    state: MessageStates;
    formattedDate: {
      date: string;
      time: string;
    };
    media: Medias;
  }[];
}

export interface ModalsProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  user: User;
}
