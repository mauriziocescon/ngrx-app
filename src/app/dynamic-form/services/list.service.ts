import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

import { Block } from "../models";

import { environment } from "../../../environments/environment";

@Injectable()
export class BlocksListService {
  protected BLOCKS_API_PATH = environment.apiUrl + "blocks";

  constructor(protected http: HttpClient) {
  }

  getBlocks(): Observable<Block[]> {
    return this.http
      .get<Block[]>(this.BLOCKS_API_PATH, {observe: "response"})
      .map(resp => {
        return resp.body;
      })
      .catch(err => Observable.throw(err.json().error || "Server error"));
  }
}
