import { Organisateur } from "./organisateur";

// models/user.model.ts
export interface User {
  id?: number;
  fullname: string;
  email: string;
  role: 'organisateur' | 'public';
  interests?: string[]; 
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  organisateur?: Organisateur;
}

















// // models/user.model.ts
// export interface User {
//     id?: number;
//     fullname: string;
//     email: string;
//     role: 'organisateur' | 'public';
//     email_verified_at?: string | null;
//     created_at?: string;
//     updated_at?: string;
//     organisateur?: Organisateur;
//   }
  
//   export interface Organisateur {
//     id?: number;
//     user_id: number;
//     nom_organis: string;
//     created_at?: string;
//     updated_at?: string;
//   }
  