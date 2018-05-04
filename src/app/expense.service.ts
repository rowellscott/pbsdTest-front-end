import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "../environments/environment";
import "rxjs/add/operator/map";

@Injectable()
export class ExpenseService {
  constructor(private myHttp: Http) {}

  //Get All Listings
  getListings() {
    return this.myHttp.get(`${environment.apiBase}`).map(res => res.json());
  }

  //Get All Customers
  getCustomers() {
    return this.myHttp
      .get(`${environment.apiBase}/customers`)
      .map(res => res.json());
  }

  //Get All Projects for Specific Customer
  getProjects(customerId) {
    return this.myHttp
      .get(`${environment.apiBase}/projects/${customerId}`)
      .map(res => res.json());
  }

  //Get Expense Details
  getExpense(id) {
    return this.myHttp
      .get(`${environment.apiBase}/expense/${id}`)
      .map(res => res.json());
  }

  //Update Expense
  updateExpense(id, updates) {
    return this.myHttp
      .put(`${environment.apiBase}/edit/${id}`, updates)
      .map(res => res.json());
  }
}
