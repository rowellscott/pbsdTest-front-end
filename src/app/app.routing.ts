import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListingsComponent } from "./components/listings/listings.component";
import { EditComponent } from "./components/edit/edit.component";
import { AddComponent } from "./components/add/add.component";

const routes: Routes = [
  {
    path: "",
    component: ListingsComponent
  },
  { path: "edit/:id", component: EditComponent },
  { path: "add", component: AddComponent },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
