import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  loginUser(url: string, userData: {email: string, password: string }): Observable<any>  {
    const data: Subject<any[]> = new Subject<any[]>();
    this.http.post(url, userData).subscribe((result: any) => {
      data.next(result);
    }, (error: any) => {
        console.log(error)
        data.error(error);
    });
    return data;
  }
}
