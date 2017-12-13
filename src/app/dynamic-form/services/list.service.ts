import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { Observable } from "rxjs/Observable";

import { Block } from "../models/block.model";

import { CheckBoxContainerComponent } from "../containers/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "../containers/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "../containers/blocks/text-input/text-input.container";

import { environment } from "../../../environments/environment";

@Injectable()
export class BlocksListService {
  private API_PATH = environment.apiUrl + "blocks";

  constructor(private http: HttpClient) {
  }

  getBlocks(): Observable<Block[]> {
    return this.http
      .get<Block[]>(this.API_PATH, {observe: "response"})
      .map(resp => {
        return resp.body;
      })
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }

  getComponent(blockId: string): any {
    switch (blockId) {
      case "check-box": {
        return CheckBoxContainerComponent;
      }
      case "dropdown": {
        return DropdownContainerComponent;
      }
      case "text-input": {
        return TextInputContainerComponent;
      }
      default: {
        return undefined;
      }
    }
  }
}
