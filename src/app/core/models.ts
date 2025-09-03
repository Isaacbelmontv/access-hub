export type Role = 'manager' | 'coordinator';

export interface AuthUser {
  id: number;
  username: string;
  role: Role;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
