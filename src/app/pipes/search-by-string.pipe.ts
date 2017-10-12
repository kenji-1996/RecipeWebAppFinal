import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByString'
})
export class SearchByStringPipe implements PipeTransform {

  transform(recipes: any, searchText: any): any {
    if(searchText == null) return recipes;

    return recipes.filter(function(recipe){
      return recipe.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
    })
  }

}
