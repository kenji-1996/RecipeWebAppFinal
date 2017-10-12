import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Recipe} from "../objects/recipe";
import {RecipeService} from "./recipe.service";

@Injectable()
export class RecipeSearchService {

  constructor(private rs: RecipeService) {}

}
