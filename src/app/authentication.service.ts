import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import * as auth0 from "auth0-js";
import { environment } from "../environments/environment";

const HOSTNAME = "http://localhost:3001/";
const AUTH0_CONFIG = {
  domain: environment.auth0Domain,
  clientID: environment.auth0ClientID,
  redirectUri: environment.auth0RedirectUri,
  audience: environment.auth0Audience,
  responseType: "token id_token",
  scope: "openid profile"
};

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private auth0: any = new auth0.WebAuth({ ...AUTH0_CONFIG });
  private expiresAt: number;
  public accessToken: string;
  public idToken: string;
  public user: object;

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): Observable<any> {
    return new Observable(observable => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          const parsedSession = this.parseSession(authResult);

          console.log("Successfuly authenticated:", parsedSession);
          this.setSession(parsedSession);
          observable.next(parsedSession);
        } else if (err) {
          console.error("There was a proble authenticating:", err);
          observable.error(err);
        }
      });

      return { unsubscribe() {} };
    });
  }

  public checkSession(): Observable<any> {
    this.auth0.checkSession({ ...AUTH0_CONFIG }, (error, authResult) => {
      if (authResult) {
        const parsedSession = this.parseSession(authResult);

        console.log("Existing session found: ", parsedSession);
        this.setSession(parsedSession);
      } else {
        console.log(
          "Something went wrong checking for an existing session",
          error
        );
      }
    });
  }

  private parseSession(authResult): any {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    return {
      accessToken: authResult.accessToken,
      idToken: authResult.idToken,
      user: {
        username: authResult.idTokenPayload.nickname,
        picture: authResult.idTokenPayload.picture
      },
      expiresAt
    };
  }

  private setSession(authResult): void {
    this.expiresAt = authResult.expiresAt;
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.user = authResult.user;
  }

  public logout(): void {
    this.auth0.logout({
      clientID: AUTH0_CONFIG.clientID,
      returnTo: HOSTNAME
    });
  }

  public isAuthenticated(): boolean {
    if (!this.accessToken) {
      return false;
    }

    const expiresAt: number = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }
}
