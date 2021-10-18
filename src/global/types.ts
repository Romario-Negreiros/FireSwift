export interface Props {
  toggleTheme: () => void;
}

export interface User {
  name: string;
  email: string;
  password: string;
  friends: string[];
}
