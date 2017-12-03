import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

import { Block } from "../models/block.model";

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
}