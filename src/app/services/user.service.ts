import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Interet } from '../models/interet';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  constructor(private http: HttpClient) {}




  getInterets() {
  return this.http.get<Interet[]>(`${this.apiUrl}/interet`);
}
  
  async registerUser(data: any): Promise<any> {
    return await firstValueFrom(this.http.post(`${this.apiUrl}/register`, data));
  }

  

  async login(data: { email: string; password: string }): Promise<any> {
    console.log(' Données envoyées au backend lors du login :', data);
  
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, data));
      console.log(' Réponse reçue du serveur :', response);
      // this.isLoggedInSubject.next(true);

      return response;
    } catch (error) {
      console.error(' Erreur lors du login :', error);
      throw error;
    }
  }

  
  async socialLogin(provider: 'google' | 'facebook'): Promise<void> {
    const authUrl = `${this.apiUrl}/auth/${provider}/callback`;
    window.location.href = authUrl;
  }

 
  saveUserSession(token: string, user: any): void {
    localStorage.setItem('access_token', token);
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  
  getCurrentUser(): any {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  }


  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

   hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
    localStorage.removeItem('name');

    this.isLoggedInSubject.next(false);
  }

  
  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }
  
  resetPassword(token: string, email: string, password: string, confirmPassword: string) {
  const payload = {
    token,
    email,
    password,
    password_confirmation: confirmPassword
  };
  return this.http.post(`${this.apiUrl}/reset-password`, payload);
}

  getUserById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }  
  
  initializeSession(): void {
  const token = this.getToken();
  const user = this.getCurrentUser();

  if (token && user) {
    this.isLoggedInSubject.next(true);
  } else {
    this.isLoggedInSubject.next(false);
  }
}

}
