import { Component, OnInit, Input } from "@angular/core";
import { PictureService } from "../picture.service";

@Component({
  selector: "auth0-picture",
  templateUrl: "./picture.component.html",
  styleUrls: ["./picture.component.css"]
})
export class PictureComponent implements OnInit {
  @Input() pictureSource: string;

  constructor(private picture: PictureService) {}

  private error: string;

  ngOnInit() {
    this.handleGetDog();
  }

  public handleGetDog(): void {
    console.log("Fetching dog");

    const request = this.picture.fetchDog().subscribe(response => {
      this.pictureSource = response.url;

      delete this.error;

      request.unsubscribe();
    }, error => (this.error = error));
  }

  public handleGetCat(): void {
    console.log("Fetching cat");

    const request = this.picture.fetchCat().subscribe(response => {
      this.pictureSource = response.url;

      delete this.error;

      request.unsubscribe();
    }, error => (this.error = error));
  }
}
