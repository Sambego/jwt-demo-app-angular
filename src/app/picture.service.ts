import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";

const API_URL = "http://localhost:3000/api";

@Injectable({
  providedIn: "root"
})
export class PictureService {
  constructor(
    private authentication: AuthenticationService,
    private http: HttpClient
  ) {}

  private getHeaders(isPrivateRequest: boolean = false): HttpHeaders {
    if (isPrivateRequest && this.authentication.isAuthenticated()) {
      return new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.authentication.accessToken}`
      });
    }

    return new HttpHeaders({
      "Content-Type": "application/json"
    });
  }

  private makePictureRequest(
    endpoint: string,
    isPrivateRequest: boolean = false
  ): Observable<any> {
    return this.http
      .get(`${API_URL}/${endpoint}`, {
        headers: this.getHeaders(isPrivateRequest)
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.error);
  }

  public fetchDog(): Observable<any> {
    return this.makePictureRequest("dog");
  }

  public fetchCat(): Observable<any> {
    return this.makePictureRequest("cat", true);
  }
}
