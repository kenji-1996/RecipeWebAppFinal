import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Ingredient } from '../objects/ingredient';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/findIndex';

@Injectable()
export class IngredientsService {

  private ingredientsSource = new Subject<Ingredient>();
  private recipeIDSource = new Subject<any>();
  private deleteIngredientSource = new Subject<Ingredient>();

  ingredientsConfirmed$ = this.ingredientsSource.asObservable();
  recipeIDConfirmed$ = this.recipeIDSource.asObservable();
  deleteIngredient$ = this.deleteIngredientSource.asObservable();

  confirmIngredients(ingredient: Ingredient) {
    this.ingredientsSource.next(ingredient);
  }

  confirmRecipeID(recipeID: any) {
    this.recipeIDSource.next(recipeID);
  }

  deleteIngredient(ingredient: Ingredient) {
    this.deleteIngredientSource.next(ingredient);
  }

}
