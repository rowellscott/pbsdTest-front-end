import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class ExpenseService {
  constructor(private myHttp: Http) {}

  getListings() {
    return this.myHttp.get(`${environment.apiBase}`).map(res => res.json());
  }
}
