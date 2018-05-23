import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";
import { Router } from "@angular/router";
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
    newAmount: any;
    newDescription: string;
  } = {
    newDate: null,
    newCustomerName: "",
    newProjectName: "",
    newName: "",
    newAmount: 0.0,
    newDescription: ""
  };

  saveError: string;
  saveSuccess: String;
  saveBoolean: boolean = true;
  customers: Array<any>;
  projects: Array<Object>;
  constructor(private myExpense: ExpenseService, private myRouter: Router) {}

  ngOnInit() {
    // Get Customers' Names For Dropdown Menu
    this.myExpense.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        console.log(this.customers);
      },
      err => {
        console.log("Error Getting Customers");
      }
    );

    this.newExpense.newAmount = this.newExpense.newAmount.toFixed(2);

    this.loadProjects();
  }

  addExpense() {
    if (this.newExpense.newAmount > 9999.99 || this.newExpense.newAmount < 0) {
      this.saveError = "Invalid Number";
      return;
    }

    this.myExpense.addExpense(this.newExpense).subscribe(
      res => {
        console.log(res);
        if (this.saveBoolean === true) {
          this.myRouter.navigate(["/"]);
        } else {
          this.newExpense ={
            newDate: null,
            newCustomerName: "",
            newProjectName: "",
            newName: "",
            newAmount: 0.0,
            newDescription: ""
          };
          this.newExpense.newAmount = this.newExpense.newAmount.toFixed(2);
          this.saveSuccess = "New Expense Successfully Saved";
          setTimeout(() => {this.saveSuccess = "" }, 3500);
        }
      },
      err => {
        if (err.status === 0) {
          return null;
        }
        console.log("Add Error:", err);
        const error = JSON.parse(err._body);

        if (error.message) {
          this.saveError = error.message;
        } else {
          this.saveError =
            "Error Adding Expense, Please Fill in All Required Fields";
        }
      }
    );
  }

  // Get Projects According to Selected Customer
  loadProjects() {
    if (this.newExpense.newCustomerName === "") {
      return null;
    }

    // console.log(this.newExpense.newCustomerName);
    let customerId = "";
    // Get Customer Id for Selected Customer
    this.customers.forEach(customer => {
      if (customer.Name === this.newExpense.newCustomerName) {
        customerId = customer._id;
      }
    });

    // Get List of Projects From Api
    this.myExpense.getProjects(customerId).subscribe(
      projects => {
        // console.log(projects);
        this.projects = projects;
      },
      () => {
        console.log("Error Retrieving Projects");
      }
    );
  }

  save() {
    this.saveBoolean = true;
  }

  saveAndAdd() {
    this.saveBoolean = false;
  }
}
