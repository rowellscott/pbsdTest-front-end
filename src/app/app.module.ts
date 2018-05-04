import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { ExpenseService } from "./expense.service";

import { AppComponent } from "./app.component";

import { AppRoutingModule } from "./app.routing";
import { EditComponent } from "./components/edit/edit.component";
import { ListingsComponent } from "./components/listings/listings.component";
import { AddComponent } from './components/add/add.component';

@NgModule({
  declarations: [AppComponent, ListingsComponent, EditComponent, AddComponent],
  imports: [BrowserModule, FormsModule, HttpModule, AppRoutingModule],
  providers: [ExpenseService],
  bootstrap: [AppComponent]
})
export class AppModule {}
