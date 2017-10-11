import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecipesComponent} from "./components/recipes/recipes.component";
import {ViewRecipeComponent} from "./components/view-recipe/view-recipe.component";
import {AddRecipeComponent} from "./components/add-recipe/add-recipe.component";

const routes: Routes = [
  { path: '', redirectTo: '/recipelist', pathMatch: 'full' },
  { path: 'recipelist',  component: RecipesComponent },
  { path: 'add-recipe',  component: AddRecipeComponent },
  { path: 'view-recipe/:id', component: ViewRecipeComponent },
  { path: 'edit-recipe/:id', component: AddRecipeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
