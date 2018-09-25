import { Component } from "@angular/core";
import { AuthenticationService } from "./authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "Cats and dogs";

  constructor(private authentication: AuthenticationService) {
    this.authentication.checkSession();
  }
}
