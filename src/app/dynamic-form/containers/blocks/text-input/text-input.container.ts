import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "ct-text-input",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./text-input.component.html",
  styleUrls: ["./text-input.component.scss"]
})
export class TextInputContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
