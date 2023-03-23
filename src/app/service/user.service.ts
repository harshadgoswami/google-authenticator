import { Injectable } from '@angular/core';
import { User } from './User';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Node/Express API
  REST_API: string = 'http://localhost:3000/api';
 
  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  getHeader() {
    let headers = new HttpHeaders()
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('token', localStorage.getItem('token'));
    return headers;
  }

  // Register
  RegisterUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/register`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  Login(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  
  VerifyUser(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/verify`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  CheckLogin(): Observable<any> {

    let API_URL = `${this.REST_API}/checklogin`;
    return this.httpClient.get(API_URL, { headers: this.getHeader() })
      .pipe(
        catchError(this.handleError)
      )
  }

  Reset2FA(id, data: any): Observable<any> {

    let API_URL = `${this.REST_API}/reset-2fa/${id}`;
    return this.httpClient.post(API_URL,data)
      .pipe(
        catchError(this.handleError)
      )
  }

  GenerateQR(id): Observable<any> {
    let API_URL = `${this.REST_API}/generateqr/${id}`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.handleError)
      )
  }

  Forgot2Fa(): Observable<any> {

    let API_URL = `${this.REST_API}/forgot-2fa`;
    return this.httpClient.get(API_URL)
      .pipe(
        catchError(this.handleError)
      )
  }

  Logout(): Observable<any> {

    let API_URL = `${this.REST_API}/logout`;
    return this.httpClient.get(API_URL, { headers: this.getHeader() })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
