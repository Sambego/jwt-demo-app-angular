import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription, throwError } from "rxjs";
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

  private pictureSubject: Subject<any> = new Subject();
  public picture: Observable<any> = this.pictureSubject;

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
  ): Subscription {
    return this.http
      .get(`${API_URL}/${endpoint}`, {
        headers: this.getHeaders(isPrivateRequest)
      })
      .pipe(catchError(this.handleError))
      .subscribe(
        response => {
          this.pictureSubject.next(response);
        },
        error => {
          this.pictureSubject.next(error);
        }
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    return throwError(error);
  }

  public fetchDog(): void {
    this.makePictureRequest("dog");
  }

  public fetchCat(): void {
    this.makePictureRequest("cat", true);
  }
}
