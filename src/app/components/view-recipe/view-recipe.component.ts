import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../objects/recipe";
import {Ingredient} from "../../objects/ingredient";
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  recipe: Recipe;
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.recipeService.getRecipe(+params.get('id')))
      .subscribe(recipe => this.recipe = recipe);

  }

  goBack(): void {
    this.location.back();
  }

  pushIngredient(): void {
    this.recipe.ingredients.push({ID:1,recipeID:1,name:'',quantity:1.25,unitsAndStyle:'grams'});
  }
}
