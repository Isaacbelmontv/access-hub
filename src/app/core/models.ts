export type Role = 'manager' | 'coordinator';

export interface AuthUser {
  id: number;
  username: string;
  role: Role;
  email: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: UserAdress;
  company: UserCompany;
}

interface UserAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; lng: string };
}

interface UserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
