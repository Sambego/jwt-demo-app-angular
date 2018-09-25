import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "auth0-callback",
  templateUrl: "./callback.component.html",
  styleUrls: ["./callback.component.css"]
})
export class CallbackComponent implements OnInit {
  constructor(
    private authentication: AuthenticationService,
    private router: Router
  ) {
    this.authentication
      .handleAuthentication()
      .subscribe(
        response => this.router.navigateByUrl("/"),
        error => this.router.navigateByUrl("/login")
      );
  }

  ngOnInit() {}
}
