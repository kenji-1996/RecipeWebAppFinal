import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../../services/recipe.service';
import {Recipe} from "../../objects/recipe";
import {Ingredient} from "../../objects/ingredient";
import {Router} from "@angular/router";
import {DataPassService} from "../../services/data-pass.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})

export class RecipesComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private dataPass: DataPassService
  ) { }

  recipes : Recipe[];
  selectedRecipe: Recipe;
  filter: boolean = false;
  filterText: string = "";
  ingredients: string;

  ngOnInit() {
    this.getRecipes();
    this.filter = false;
  }

  getRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  selectRecipe(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }

  viewDetail(): void {
    this.router.navigate(['/view-recipe',this.selectedRecipe.ID]);
  }

  addRecipe() {
    this.router.navigate(['/add-recipe']);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.selectedRecipe);
  }

  getIngredients(ingredients: Ingredient[]): string {
    this.ingredients = '';
      for (let i = 0; i < ingredients.length; i++) {
        this.ingredients += ingredients[i].name + (i == (ingredients.length -1) ? "" : ", ");
      }
    return this.ingredients;
  }

  editRecipe(): void {
    this.router.navigate(['/edit-recipe',this.selectedRecipe.ID]);
  }

  ngOnDestroy() {

  }
}
