import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "ct-check-box",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./check-box.container.html",
  styleUrls: ["./check-box.container.scss"]
})
export class CheckBoxContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
