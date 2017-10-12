import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Ingredient} from "../../objects/ingredient";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../objects/recipe";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/combineLatest';
import {IngredientsService} from "../../services/ingredients.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrls: ['./add-ingredient.component.css']
})
export class AddIngredientComponent implements OnInit, OnDestroy {

  //Constructor
  constructor(
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private ingredientsService: IngredientsService,
    private route: ActivatedRoute,

  ) {
  }

  //Empty vars
  newIngredients: Ingredient[] = [];
  recipeList: Recipe[];
  addIngredientForm: FormGroup;
  generateIngredientID: any = 0;
  generateRecipeID: any = 0;
  tempIngredient: any;
  selectedIngredient: Ingredient;
  editRecipe: Recipe;

  //Delete function that pings a service
  deleteIngredient() {
    this.ingredientsService.deleteIngredient(this.selectedIngredient);
     const index: number = this.newIngredients.indexOf(this.selectedIngredient);
     if (index !== -1) {
       this.newIngredients.splice(index, 1);
     }
  }

  //Select function
  selectIngredient(ingredient: Ingredient): void {
    this.selectedIngredient = ingredient;
    this.addIngredientForm.controls.name.setValue(this.selectedIngredient.name);
    this.addIngredientForm.controls.quantity.setValue(this.selectedIngredient.quantity);
    this.addIngredientForm.controls.unitsAndStyle.setValue(this.selectedIngredient.unitsAndStyle);
  }

  //Update function
  updateIngredient(): void {
    this.tempIngredient = <Ingredient>{
      ID: this.selectedIngredient.ID,
      recipeID: this.selectedIngredient.recipeID,
      name: this.addIngredientForm.controls.name.value,
      quantity: this.addIngredientForm.controls.quantity.value,
      unitsAndStyle: this.addIngredientForm.controls.unitsAndStyle.value
    };
    this.ingredientsService.deleteIngredient(this.selectedIngredient);
    const index: number = this.newIngredients.indexOf(this.selectedIngredient);
    if (index !== -1) {
      this.newIngredients.splice(index, 1);
    }
    this.newIngredients.push(this.tempIngredient);
    this.ingredientsService.confirmIngredients(this.tempIngredient);
  }

  addIngredient(): void {
    if(this.addIngredientForm.controls.name.value && this.addIngredientForm.controls.quantity.value) {
      this.recipeService.getRecipes().subscribe(
        recipe => {
          this.recipeList = recipe;
          for (let i = 0; i < recipe.length; i++) {
            for (let j = 0; j < this.recipeList[i].ingredients.length; j++) {
              if (this.recipeList[i].ingredients[j].ID > this.generateIngredientID) {
                this.generateIngredientID = this.recipeList[i].ingredients[j].ID;
              }
            }
          }
          this.generateIngredientID++;
        },
      );
      this.tempIngredient = <Ingredient>{
        ID: this.generateIngredientID,
        recipeID: this.generateRecipeID,
        name: this.addIngredientForm.controls.name.value,
        quantity: this.addIngredientForm.controls.quantity.value,
        unitsAndStyle: this.addIngredientForm.controls.unitsAndStyle.value
      };
      this.addIngredientForm.controls.name.setValue('');
      this.addIngredientForm.controls.quantity.setValue('');
      this.addIngredientForm.controls.unitsAndStyle.setValue('');
      if(isNullOrUndefined(this.editRecipe)) {  this.ingredientsService.confirmIngredients(this.tempIngredient); }
      this.newIngredients.push(this.tempIngredient);

    }else{
        alert("Please fill in name and quantity");
    }
    console.log("called add ingre");
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.recipeService.getRecipe(+params.get('id')))
      .subscribe(recipe => this.editRecipe = recipe);
    if(!isNullOrUndefined(this.editRecipe)) {
      console.log(this.editRecipe);
      this.newIngredients = this.editRecipe.ingredients;
    }
    this.addIngredientForm = this.formBuilder.group({
      name: ['',Validators.required],
      quantity: ['',Validators.required],
      unitsAndStyle: ''
    })
    this.recipeService.getRecipes().subscribe(
      recipe => {
        this.recipeList=recipe;
        for (let i = 0; i < recipe.length; i++) {
            if(this.recipeList[i].ID > this.generateRecipeID) {
              this.generateRecipeID = this.recipeList[i].ID;
            }
        }
        this.generateRecipeID++;
        console.log(this.generateRecipeID + " " + this.generateIngredientID + " " + this.addIngredientForm.controls.name.value);
      },
    );
    this.ingredientsService.confirmRecipeID(this.generateRecipeID);
  }

  ngOnDestroy() {

  }

}
