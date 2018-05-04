import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";

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
  } = {
    editDate: null,
    editCustomerName: "",
    editProjectName: "",
    editName: "",
    editAmount: 0,
    editDescription: ""
  };

  customers: any;
  customerId: string = "";
  constructor(private myExpense: ExpenseService) {}

  ngOnInit() {
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

  loadProjects() {
    console.log(this.expense.editCustomerName);
  }
}
