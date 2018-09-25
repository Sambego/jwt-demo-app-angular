import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../authentication.service";

@Component({
  selector: "auth0-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {}

  public handleLogin() {
    this.authentication.login();
  }

  public handleLogout() {
    this.authentication.logout();
  }
}
