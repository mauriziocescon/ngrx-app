import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "ct-dropdown",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./dropdown.container.html",
  styleUrls: ["./dropdown.container.scss"],
})
export class DropdownContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
