export interface user {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface AuthContextValue {
  currentUser: user | null;
  isAuthenticated: boolean;
  signin: (inputs: user) => void;
  signup: (inputs: user) => void;
  logout: () => void;
} 