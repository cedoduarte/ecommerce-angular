import { Injectable, inject } from '@angular/core';
import { ISigninUserDto, IUserViewModel, IUpdateUserDto, IDeleteAccountDto, ICreateAccountDto, IChangePasswordDto } from "../shared/interfaces";
import { Observable, share } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_USER_GET_LIST, AUTHORIZATION_TOKEN, URL_USER_GET_BY_ID, URL_USER_UPDATE, URL_USER_SIGNIN, URL_USER_RESTORE, URL_ACCOUNT_DELETE, URL_USER_DELETE, URL_USER_CREATE, URL_USER_CHANGE_PASSWORD } from "../shared/constants";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  constructor() { }

  changeUserPassword(body: IChangePasswordDto): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.put<IUserViewModel>(URL_USER_CHANGE_PASSWORD, body, { headers }).pipe(share());
  }

  createUser(body: ICreateAccountDto): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.post<IUserViewModel>(URL_USER_CREATE, body, { headers }).pipe(share());
  }

  deleteUser(id: number): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.delete<IUserViewModel>(`${URL_USER_DELETE}/${id}`, { headers }).pipe(share());
  }

  deleteAccount(body: IDeleteAccountDto): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.put<IUserViewModel>(URL_ACCOUNT_DELETE, body, { headers }).pipe(share());
  }

  restoreUser(id: number): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.put<IUserViewModel>(`${URL_USER_RESTORE}/${id}`, { headers }).pipe(share());
  }

  signinUser(body: ISigninUserDto): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.post<IUserViewModel>(URL_USER_SIGNIN, body, { headers }).pipe(share());
  }

  updateUser(body: IUpdateUserDto): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.put<IUserViewModel>(URL_USER_UPDATE, body, { headers }).pipe(share());
  }

  getUserById(id: number): Observable<IUserViewModel> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.get<IUserViewModel>(`${URL_USER_GET_BY_ID}/${id}`, { headers }).pipe(share());
  }

  getUserList(getAll: boolean, keyword: string): Observable<IUserViewModel[]> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": AUTHORIZATION_TOKEN
    });
    return this.http.get<IUserViewModel[]>(`${URL_USER_GET_LIST}?GetAll=${getAll}&Keyword=${keyword}`, { headers }).pipe(share());
  }
}
