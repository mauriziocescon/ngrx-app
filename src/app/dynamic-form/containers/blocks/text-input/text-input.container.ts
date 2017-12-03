import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "ct-text-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./text-input.container.html",
  styleUrls: ["./text-input.container.scss"],
})
export class TextInputContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
