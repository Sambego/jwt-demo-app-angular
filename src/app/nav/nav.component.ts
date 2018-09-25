import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "auth0-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit() {}

  public handleLogin() {
    this.router.navigateByUrl("/login");
  }

  public handleLogout() {
    this.authentication.logout();
  }
}
