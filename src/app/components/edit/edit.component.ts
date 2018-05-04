import { Component, OnInit } from "@angular/core";

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
    editCustomerName: null,
    editProjectName: null,
    editName: null,
    editAmount: null,
    editDescription: null
  };

  constructor() {}

  ngOnInit() {}
}
