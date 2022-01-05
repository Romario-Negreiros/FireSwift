import { Unsubscribe } from 'firebase/firestore';

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
  groups: {
    id: string;
    name: string;
    role: Roles;
  }[];
}

type Reaction = {
  id: string;
  reaction: string;
};

export interface Medias {
  images: string[];
  videos: string[];
  docs: {
    url: string;
    name: string;
  }[];
  audios?: string[];
}

export interface Post {
  id: string;
  author: string;
  authorID: string;
  groupID?: string;
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

export interface MsgReply {
  id: string;
  user: {
    id: string;
    name: string;
    picture: string;
  };
  text: string;
  media: Medias;
  sentDate: {
    date: string;
    time: string;
  };
  wasViewed: boolean;
}

export interface Message extends MsgReply {
  isReplyingTo?: MsgReply;
}

export interface ChatUser {
  id: string;
  name: string;
  picture: string;
  chats: {
    id: string;
    receiverID: string;
  }[];
}

export interface Chat {
  id: string;
  users: ChatUser[];
  messages: Message[];
  creationDate: {
    date: string;
    time: string;
  };
  unsubscribe?: Unsubscribe;
}

export interface ModalsProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
  user: User;
}

export enum Roles {
  Owner = 'OWNER',
  Admin = 'ADMIN',
  Member = 'MEMBER',
}

export interface GroupUser extends ChatUser {
  entranceDate: {
    date: string;
    time: string;
  };
  role: Roles;
}

export interface Group {
  id: string;
  name: string;
  desc: string;
  creationDate: {
    date: string;
    time: string;
  };
  owner: User;
  users: GroupUser[];
  admins: GroupUser[];
  private: boolean;
  requests: {
    usersToJoin: GroupUser[];
    postsToPublish: Post[];
  };
  posts: string[];
  likes: string[];
  picture: string;
}

export interface ContentConstraints {
  id: string;
  name: string;
  picture: string;
  chats?: {
    id: string;
    receiverID: string;
  }[];
  role?: Roles;
}
