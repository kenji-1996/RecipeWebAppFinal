export class Ingredient {
  ID: number;
  recipeID: number;
  name: string;
  quantity: number;
  unitsAndStyle: string;
  constructor(_ID: number,_recipeID: number, _name: string, _quantity: number, _unitsAndStyle: string) {
      this.ID = _ID;
      this.recipeID = _recipeID;
      this.name = _name;
      this.quantity = _quantity;
      this.unitsAndStyle = _unitsAndStyle;
    }
}
