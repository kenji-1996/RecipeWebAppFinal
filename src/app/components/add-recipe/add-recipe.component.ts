import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { Location } from '@angular/common';
import {Subscription} from "rxjs/Subscription";
import {IngredientsService} from "../../services/ingredients.service";
import {Ingredient} from '../../objects/ingredient';
import {RecipeService} from "../../services/recipe.service";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import {Recipe} from "../../objects/recipe";
import {DataPassService} from "../../services/data-pass.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']

})
export class AddRecipeComponent implements OnInit, OnDestroy {

  ingredientList: Ingredient[] = [];
  subscription: Subscription;
  newRecipe: Recipe;
  tempRecipe: Recipe;
  generateRecipeID: any = 0;
  recipeList: Recipe[];
  editRecipe: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private location: Location,
    private ingredientService: IngredientsService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private dataPass: DataPassService)
  {
    this.subscription = ingredientService.ingredientsConfirmed$.subscribe(x => this.ingredientList.push(x));
    this.subscription = ingredientService.deleteIngredient$.subscribe(x => this.deleteIngredient(x));
    this.subscription = ingredientService.recipeIDConfirmed$.subscribe(x => this.generateRecipeID = x);
  }

  addRecipeForm: FormGroup;

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.recipeService.getRecipe(+params.get('id')))
      .subscribe(recipe => this.newRecipe = recipe);
    if(!isNullOrUndefined(this.newRecipe)) {
      this.editRecipe = true;
      this.ingredientList = this.newRecipe.ingredients;
    }
    this.addRecipeForm = this.formBuilder.group({
      name: [this.editRecipe? this.newRecipe.name : '',Validators.required],
      serves: this.editRecipe? this.newRecipe.serves : '',
      steps: this.editRecipe? this.newRecipe.steps : '',
      remarks: this.editRecipe? this.newRecipe.remarks : ''
    });
    this.recipeService.getRecipes().subscribe(
      recipe => {
        this.recipeList=recipe;
        for (let i = 0; i < recipe.length; i++) {
          if(this.recipeList[i].ID > this.generateRecipeID) {
            this.generateRecipeID = this.recipeList[i].ID;
          }
        }
      },
    );


  }


  deleteIngredient(id: Ingredient) {
    const index: number = this.ingredientList.indexOf(id);
    if (index !== -1) {
      this.ingredientList.splice(index, 1);
    }
  }

  goBack(): void {
    this.location.back();
  }

  addRecipe(): void {
    if (this.addRecipeForm.controls.name.value) {
        this.newRecipe = <Recipe>{
          ID: this.editRecipe? this.newRecipe.ID : this.generateRecipeID,
          name: this.addRecipeForm.controls.name.value,
          serves: this.addRecipeForm.controls.serves.value,
          steps: this.addRecipeForm.controls.steps.value,
          remarks: this.addRecipeForm.controls.remarks.value,
          ingredients: this.ingredientList
        };
        if(this.editRecipe) {
          this.recipeService.showUpdatedItem(this.newRecipe);
        }else {
          this.recipeService.addRecipe(this.newRecipe);
          console.log("added recipe")
        }
        this.location.back();
      }else{
        alert("Please fill in recipe name");
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
