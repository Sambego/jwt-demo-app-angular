import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "auth0-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.css"]
})
export class ButtonComponent implements OnInit {
  @Input() public primary: boolean = false;
  @Input() public cta: boolean = false;

  constructor() {}

  ngOnInit() {}
}
