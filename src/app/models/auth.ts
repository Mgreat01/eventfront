export interface Auth {
  message: string;
  data: UserData;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  token: string;
}