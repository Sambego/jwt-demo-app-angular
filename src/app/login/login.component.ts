import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "auth0-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private authentication: AuthenticationService,
    public router: Router
  ) {}

  username: string;
  password: string;

  ngOnInit() {}

  handleChange(name, value): void {
    this[name] = value;
  }

  handleLogin(event): void {
    event.preventDefault();

    this.authentication.login(this.username, this.password).subscribe(
      response => {
        console.log("Success authenticating:", response.jwt);
        delete this.error;
      },
      error => {
        console.log("Error authenticating", error);
        this.error = error.error_description;
      }
    );
  }
}
