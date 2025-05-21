import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  
  async registerUser(data: any): Promise<any> {
    return await firstValueFrom(this.http.post(`${this.apiUrl}/register`, data));
  }

  //  
  // async login(data: { email: string; password: string }): Promise<any> {
  //   console.log(' Données envoyées au backend lors du login :', data);
  //   return await firstValueFrom(this.http.post(`${this.apiUrl}/login`, data));
    
  // }

  async login(data: { email: string; password: string }): Promise<any> {
    console.log(' Données envoyées au backend lors du login :', data);
  
    try {
      const response = await firstValueFrom(this.http.post(`${this.apiUrl}/login`, data));
      console.log(' Réponse reçue du serveur :', response);
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


  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('current_user');
  }

  
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  forgotPassword(email: string) {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { email });
  }
  
  resetPassword(token: string, newPassword: string) {
    const payload = {
      token: token,
      password: newPassword
    };
  
    return this.http.post(`${this.apiUrl}/reset-password`, payload);
  }
  getUserById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }  
  
}
