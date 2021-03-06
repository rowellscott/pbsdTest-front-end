import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";
import { Router, ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/map";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.css"]
})
export class ListingsComponent implements OnInit {
  listings: Array<any>;
  expAmounts: Array<number> = [];
  expTotal: number;
  searchText: string;
  searchBool: boolean = false;
  searchListings: Array<any>;

  constructor(private myExpense: ExpenseService, private myRouter: Router) {}

  ngOnInit() {
    this.myExpense.getListings().subscribe(
      listings => {
        console.log("listings:", listings);
        this.listings = listings;
        this.calculateSum(listings);
      },
      err => {
        console.log("Error Getting Listings");
        console.log("err:", err);
      }
    );
  }

  search(searchText) {
    //Validate Search Input For Text
    if ((this.searchText = "")) {
      return;
    }

    //Set searchBool to True to Display this.searchListings
    this.searchBool = true;

    this.searchListings = this.listings.filter(listing => {
      if (
        listing.CustomerName.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ===
          true ||
        listing.ProjectId.Name.toLowerCase().indexOf(searchText.toLowerCase()) >
          -1 ===
          true ||
        listing.Amount.$numberDecimal.indexOf(searchText.toLowerCase()) > -1 ===
          true
      ) {
        return true;
      }
    });
    this.calculateSum(this.searchListings);
  }

  clear() {
    this.searchBool = false;
    this.searchText = "";
    this.calculateSum(this.listings);
  }

  deleteExpense(id) {
    if (!confirm("Are you sure you want to delete this expense record?")) {
      return;
    }

    this.myExpense.deleteExpense(id).subscribe(
      res => {
        this.myExpense.getListings().subscribe(
          listings => {
            console.log("listings:", listings);
            this.listings = listings;
            this.calculateSum(listings);
          },
          err => {
            console.log("Error Getting Listings");
            console.log("err:", err);
          }
        );
        window.scroll(0, 0);
      },
      err => {
        console.log("Error in deleting:", err);
      }
    );
  }

  //Calculate Total Amount of Expenses
  calculateSum(listings) {
    this.expAmounts = [];
    // Push All Amounts into expAmounts Array
    listings.forEach(listing =>
      this.expAmounts.push(parseFloat(listing.Amount.$numberDecimal))
    );

    if (this.expAmounts[0] === undefined) {
      this.expTotal = 0;
      return (this.expTotal = parseInt(this.expTotal.toFixed(2), 10));
    }
    // Find Sum of All Amounts
    this.expTotal = this.expAmounts.reduce((sum, current): number => {
      return sum + current;
    });
    this.expTotal = parseInt(this.expTotal.toFixed(2), 10);
  }
}
