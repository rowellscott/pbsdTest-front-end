import { Component, OnInit } from "@angular/core";
import { ExpenseService } from "../../expense.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import "rxjs/add/operator/map";

@Component({
  selector: "app-listings",
  templateUrl: "./listings.component.html",
  styleUrls: ["./listings.component.css"]
})
export class ListingsComponent implements OnInit {
  listings: Array<Object>;
  expAmounts: Array<number> = [];
  expTotal: number;
  constructor(private myExpense: ExpenseService) {}

  ngOnInit() {
    this.myExpense.getListings().subscribe(
      listings => {
        console.log("listings:", listings);
        this.listings = listings;

        //Push All Amounts into expAmounts Array
        listings.forEach(listing =>
          this.expAmounts.push(parseFloat(listing.Amount.$numberDecimal)
        );
        
        //Find Sum of All Amounts
        this.expTotal = this.expAmounts.reduce((sum, current): number => {
          return sum + current;
        });
        this.expTotal.toFixed(2);
      },
      () => {
        console.log("Error Getting Listings");
      }
    );
  }
}
