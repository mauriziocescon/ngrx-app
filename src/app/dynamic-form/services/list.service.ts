import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/operator/map";
import "rxjs/add/operator/catch";

import { Block, BlockType } from "../models";

import { CheckBoxContainerComponent } from "../containers/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "../containers/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "../containers/blocks/text-input/text-input.container";
import { UnknownComponent } from "../components";

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

  getComponent(block: Block): any {
    switch (block.type) {
      case BlockType.CheckBox: {
        return CheckBoxContainerComponent;
      }
      case BlockType.Dropdown: {
        return DropdownContainerComponent;
      }
      case BlockType.TextInput: {
        return TextInputContainerComponent;
      }
      default: {
        return UnknownComponent;
      }
    }
  }
}
