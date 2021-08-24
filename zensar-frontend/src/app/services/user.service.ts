import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData: User[] = [];
  notification = new BehaviorSubject<boolean>(false);
  notificationText: string = '';
  constructor(private http: HttpClient) {}

  getUserData(): Observable<User[]> {
    return this.http.get<User[]>(environment.backendUrl + 'users');
  }

  getUserById(userId: string) {
    for (let user of this.userData) {
      if (user._id == userId) {
        return user;
      }
    }
  }
  fetchUserById(userId: string): Observable<User> {
    return this.http.get<User>(environment.backendUrl + 'users/' + userId);
  }

  addUser(userData: User): Observable<boolean> {
    return this.http.post<boolean>(environment.backendUrl + 'users/', userData);
  }

  updateUserAddress(userId: string, addressData: any) {
    return this.http.patch(
      environment.backendUrl + 'users/' + userId,
      addressData
    );
  }
  updateUserDetails(userId: string, data: any) {
    return this.http.patch(environment.backendUrl + 'users/' + userId, data);
  }

  deleteUser(userId) {
    return this.http.delete(environment.backendUrl + 'users/' + userId);
  }
}
