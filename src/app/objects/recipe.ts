import { Ingredient } from './ingredient';

export class Recipe {
  ID: number;
  name: string;
  serves: number;
  steps: string;
  remarks: string;
  ingredients: Ingredient[];
}
