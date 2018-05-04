import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListingsComponent} from './components/listings/listings.component
import { EditComponent } from "./components/edit/edit.component";

const routes: Routes = [
  { path: '',
    component: ListingsComponent
  },
  {path: "edit/:id", component: EditComponent}
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
