import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";

@Component({
  selector: "ct-list",
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./list.container.html",
  styleUrls: ["./list.container.scss"]
})
export class ListContainerComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
