import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"],
  providers: [DatePipe]
})
export class EditComponent implements OnInit {
  expense: {
    editDate: any;
    editCustomerName: string;
    editProjectName: string;
    editName: string;
    editAmount: number;
    editDescription: string;
    _id: String;
  } = {
    editDate: null,
    editCustomerName: null,
    editProjectName: null,
    editName: null,
    editAmount: null,
    editDescription: null,
    _id: null
  };

  updatedExpense: Object = {};
  saveError: String;
  saveSuccess: String;
  saveBoolean: boolean = true;

  customers: Array<any>;
  projects: Array<Object>;

  constructor(
    private myExpense: ExpenseService,
    private myRoute: ActivatedRoute,
    private myRouter: Router,
    private myDate: DatePipe
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
          //Split Date String to Display In Form
          const date = expense.Date.substring(0, 10);
          console.log(expense);

          this.expense = {
            editDate: date,
            editCustomerName: expense.CustomerName,
            editProjectName: expense.ProjectId.Name,
            editName: expense.Name,
            editAmount: expense.Amount.$numberDecimal,
            editDescription: expense.Description,
            _id: expense._id
          };

          this.loadProjects();
          console.log(this.expense);
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

    //Get List of Projects From API
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

  editExpense(id) {
    //Validate Input Fields
    if (
      this.expense.editAmount > 9999.99 ||
      this.expense.editAmount < 0 ||
      !this.expense.editAmount
    ) {
      this.saveError = "Invalid Number";
      return;
    }

    if (!this.expense.editDate) {
      this.saveError = "Please Select A Date";
      return;
    }

    if (!this.expense.editName) {
      this.saveError = "Please Fill in Name Field";
      return;
    }

    if (this.expense.editDescription.length > 350) {
      this.saveError = "Description Exceeds 350 Character Limit";
      return;
    }

    //Create Object With Updates
    this.updatedExpense = {
      editDate: this.expense.editDate,
      editCustomerName: this.expense.editCustomerName,
      editProjectName: this.expense.editProjectName,
      editName: this.expense.editName,
      editAmount: this.expense.editAmount,
      editDescription: this.expense.editDescription
    };
    

    //Send Updates to Database
    this.myExpense.updateExpense(id, this.updatedExpense).subscribe(
      res => {
        //If Click Save
        if (this.saveBoolean === true) {
          this.myRouter.navigate(["/"]);
        //Else If Click Apply
        } else {
          const date = res.Date.substring(0, 10);
          console.log(res);
          const projectName = this.expense.editProjectName;
          this.expense = {
            editDate: date,
            editCustomerName: res.CustomerName,
            editProjectName: projectName,
            editName: res.Name,
            editAmount: res.Amount.$numberDecimal,
            editDescription: res.Description,
            _id: res._id
          };
   
          this.saveError = "";
          this.saveSuccess = "Edits Saved Successfully"
          setTimeout(() => {this.saveSuccess = "" }, 3500);
        }
      },
      err => {
        this.saveError = err;
      }
    );
  }

  //Indicate Save Button is Clicked
  save() {
    this.saveBoolean = true;
  }

  //Indicate Apply Button is Clicked
  apply() {
    this.saveBoolean = false;
  }
}
