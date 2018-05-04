import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit {
  expense: {
    editDate: Date;
    editCustomerName: string;
    editProjectName: string;
    editName: string;
    editAmount: number;
    editDescription: string;
    _id: String;
  };

  updatedExpense: Object = {};
  saveError: String;

  customers: Array<Object>;
  projects: Array<Object>;

  constructor(
    private myExpense: ExpenseService,
    private myRoute: ActivatedRoute,
    private myRouter: Router
  ) {}

  ngOnInit() {
    //Get Customers' Names For Dropdown Menu
    this.myExpense.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        // console.log(this.customers);
      },
      () => {
        console.log("Error Getting Customers");
      }
    );
    //Get Expense Details To Populate Into Form
    this.myRoute.params.subscribe(params => {
      this.myExpense.getExpense(params["id"]).subscribe(
        expense => {
          // console.log(expense);
          this.expense = {
            editDate: expense.Date,
            editCustomerName: expense.CustomerName,
            editProjectName: expense.ProjectId.Name,
            editName: expense.Name,
            editAmount: expense.Amount.$numberDecimal,
            editDescription: expense.Description,
            _id: expense._id
          };
          this.loadProjects();
          // console.log(this.expense);
        },
        () => {
          console.log("Error Getting Expense");
        }
      );
    });
  }

  // Get Projects According to Selected Customer
  loadProjects() {
    // console.log(this.expense.editCustomerName);
    let customerId = "";
    // Get Customer Id for Selected Customer
    this.customers.forEach(customer => {
      if (customer.Name === this.expense.editCustomerName) {
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

  editExpense(id) {
    this.updatedExpense = {
      editDate: this.expense.editDate,
      editCustomerName: this.expense.editCustomerName,
      editProjectName: this.expense.editProjectName,
      editName: this.expense.editName,
      editAmount: this.expense.editAmount,
      editDescription: this.expense.editDescription
    };

    this.myExpense.updateExpense(id, this.updatedExpense).subscribe(
      res => {
        this.myRouter.navigate(["/"]);
      },
      err => {
        this.saveError = err;
      }
    );
  }
}
