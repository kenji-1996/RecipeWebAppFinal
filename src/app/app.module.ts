import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import {RecipeService} from "./services/recipe.service";
import { OrderBy } from './pipes/order-by.pipe';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchByStringPipe } from './pipes/search-by-string.pipe';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import {AppRoutingModule} from "./app-routing.module";
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { AddIngredientComponent } from './components/add-ingredient/add-ingredient.component';
import {IngredientsService} from "./services/ingredients.service";
import { ValuesPipe } from './pipes/values.pipe';
import {DataPassService} from "./services/data-pass.service";
import {ROUTER_CONFIGURATION, RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    OrderBy,
    SearchByStringPipe,
    ViewRecipeComponent,
    AddRecipeComponent,
    AddIngredientComponent,
    ValuesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [ RecipeService,OrderBy, SearchByStringPipe, IngredientsService, DataPassService ],//{provide: LocationStrategy, useClass: HashLocationStrategy}
  bootstrap: [AppComponent]
})
export class AppModule { }
