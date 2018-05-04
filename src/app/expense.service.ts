import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class ExpenseService {
  constructor(private myHttp: Http) {}
  customers: any = [];
  getListings() {
    return this.myHttp.get(`${environment.apiBase}`).map(res => res.json());
  }

  getCustomers() {
    return this.myHttp
      .get(`${environment.apiBase}/customers`)
      .map(res => res.json());
  }

  getProjects(customerId) {
    return this.myHttp
      .get(`${environment.apiBase}/projects/${customerId}`)
      .map(res => res.json());
  }
}
