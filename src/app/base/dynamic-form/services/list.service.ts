import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Block, BlockType, CheckBoxBlock, DropdownBlock, TextInputBlock } from "../models";

import { CheckBoxContainerComponent } from "../containers/blocks/check-box/check-box.container";
import { DropdownContainerComponent } from "../containers/blocks/dropdown/dropdown.container";
import { TextInputContainerComponent } from "../containers/blocks/text-input/text-input.container";
import { UnknownComponent } from "../components";

import { BlockHooksService } from "../../../custom/hooks/services/block-hooks.service";

import { environment } from "../../../../environments/environment";

@Injectable()
export class BlocksListService {
  protected BLOCKS_API_PATH = environment.apiUrl + "blocks";

  constructor(protected http: HttpClient,
              protected blocksHooks: BlockHooksService) {
  }

  getBlocks(): Observable<Block[]> {
    return this.http
      .get<Block[]>(this.BLOCKS_API_PATH, {observe: "response"})
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

  componentBlockInputsIsSet(block: Block): void {
    switch (block.type) {
      case BlockType.CheckBox: {
        const checkBoxBlock = block as CheckBoxBlock;
        this.blocksHooks.loadCheckBoxBlock(checkBoxBlock);
        break;
      }
      case BlockType.Dropdown: {
        const dropdownBlock = block as DropdownBlock;
        this.blocksHooks.loadDropdownBlock(dropdownBlock);
        break;
      }
      case BlockType.TextInput: {
        const textInputBlock = block as TextInputBlock;
        this.blocksHooks.loadTextInputBlock(textInputBlock);
        break;
      }
      default: {
        break;
      }
    }
  }
}
