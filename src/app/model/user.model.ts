export interface User {
  firstname: string;
  lastname: string;
  email: string;
  dob?: Date; // Assuming this is an optional field
  address?: string;
  phoneNumber?: string;
  password: string;
}

export interface UserDetails{
  firstname: string;
  lastname: string;
  email: string;
  dob?: Date;
  address?: string;
  phoneNumber?: string;
}

