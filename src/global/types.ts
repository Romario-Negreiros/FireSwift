export interface Props {
  toggleTheme: () => void;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  friends: string[];
  bio: string;
  info: {
    age: number | null;
    relationship: string;
    country: string;
    languages: string[];
    tastes: string;
  }
}
