import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";
import { Router, ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
  newExpense: {
    newDate: Date;
    newCustomerName: string;
    newProjectName: string;
    newName: string;
    newAmount: number;
    newDescription: string;
  };

  saveError: string;
  customers: Array<Object>;
  projects: Array<Object>;
  constructor(private myExpense: ExpenseService) {}

  ngOnInit() {
    //Get Customers' Names For Dropdown Menu
    this.myExpense.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        console.log(this.customers);
      },
      () => {
        console.log("Error Getting Customers");
      }
    );
  }

  addExpense() {
    this.myExpense.addExpense(this.newExpense).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.saveError = err.statusText;
        console.log("Add Error:", err);
      }
    );
  }

  // Get Projects According to Selected Customer
  loadProjects() {
    console.log(this.newExpense.newCustomerName);
    let customerId = "";
    // Get Customer Id for Selected Customer
    this.customers.forEach(customer => {
      if (customer.Name === this.newExpense.newCustomerName) {
        customerId = customer._id;
      }
    });

    //Get List of Projects From Api
    this.myExpense.getProjects(customerId).subscribe(
      projects => {
        console.log(projects);
        this.projects = projects;
      },
      () => {
        console.log("Error Retrieving Projects");
      }
    );
  }
}
