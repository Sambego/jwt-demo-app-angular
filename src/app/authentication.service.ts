import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

const API_URL = "http://localhost:3000/api";
const API_ENDPOINT = `${API_URL}/authenticate`;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  public accessToken: string;

  public login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };

    return this.http
      .post(
        API_ENDPOINT,
        {
          username,
          password
        },
        httpOptions
      )
      .pipe(tap(response => (this.accessToken = response.jwt)));
  }

  public logout(): void {
    delete this.accessToken;
  }

  public isLoggedIn(): boolean {
    return !!this.accessToken;
  }
}
