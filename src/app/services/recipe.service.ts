import { Injectable } from '@angular/core';

import { Recipe } from '../objects/recipe';
import {RECIPES} from '../data/recipes';
import 'rxjs/add/observable/of';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class RecipeService {

  //Promise data so we can load the page without waiting for it
  getRecipes(): Observable<Recipe[]> {
    return Observable.of(RECIPES);
  }

  addRecipe(recipe: Recipe) {
    RECIPES.push(recipe);
  }

  deleteRecipe(recipe: Recipe) {
    const index: number = RECIPES.indexOf(recipe);
    if (index !== -1) {
      RECIPES.splice(index, 1);
    }
  }

  showUpdatedItem(newItem: any){
    const findRecipe = RECIPES.find(recipe => recipe.ID === newItem.ID);
    if(findRecipe) {
      findRecipe.ID = newItem.ID;
      findRecipe.name = newItem.name;
      findRecipe.serves = newItem.serves;
      findRecipe.ingredients = newItem.ingredients;
      findRecipe.remarks = newItem.remarks;
    }else{
      console.log("no item updated")
    }
  }

  findIndexToUpdate(newItem: any) {
    return newItem.id === this;
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.getRecipes()
      .map(recipe => recipe.find(recipe => recipe.ID == id));
  }


}
