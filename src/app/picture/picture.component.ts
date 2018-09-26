import { Component, OnInit, Input } from "@angular/core";
import { PictureService } from "../picture.service";

@Component({
  selector: "auth0-picture",
  templateUrl: "./picture.component.html",
  styleUrls: ["./picture.component.css"]
})
export class PictureComponent implements OnInit {
  public picture: string;
  public error: string;

  constructor(private pic: PictureService) {
    this.pic.picture.subscribe(response => {
      if (response.error) {
        this.error = response.error.error;
      } else {
        delete this.error;
        this.picture = response.url;
      }
    });
  }

  ngOnInit() {
    this.handleGetDog();
  }

  public handleGetDog(): void {
    console.log("Fetching dog");

    this.pic.fetchDog();
  }

  public handleGetCat(): void {
    console.log("Fetching cat");

    this.pic.fetchCat();
  }
}
