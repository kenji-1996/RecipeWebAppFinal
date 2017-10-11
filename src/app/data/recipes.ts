import { Recipe } from '../objects/recipe';

export var RECIPES: Recipe[] =
  [
  { ID: 1, name: 'Breakfast Quinoa', serves: 3, steps: 'Bring milk to a boil\n' +
  'Add quinoa and return to a boil\n' +
  'Simmer for 15 minutes\n' +
  'Add 3/4 of banana and raspberries\n' +
  'Cook until all milk is absorbed\n' +
  'Add remaing banana and raspberries', remarks: '1300 KJ per serve',
  ingredients:
    [
      {ID:1,recipeID:1,name:'ALMOND MILK',quantity:2,unitsAndStyle:'cups'},
      {ID:2,recipeID:1,name:'QUINOA',quantity:1,unitsAndStyle:'cup'},
      {ID:3,recipeID:1,name:'BANANA',quantity:1,unitsAndStyle:'sliced'},
      {ID:4,recipeID:1,name:'RASPBEERRIES',quantity:1,unitsAndStyle:'cup'}
    ]
  },


  { ID: 2, name: 'Sweet Potato Ham Fritters', serves: 4, steps: '1. Beat the eggs in a large bowl.\n' +
  '2. Add sweet potato and ham.\n' +
  '3. heat 2 spoons of oive oil in  frying pan.\n' +
  '4. Spoon the batter and cook until brown on each side.', remarks: 'High in fibre, low in carbohydrate',
    ingredients:
      [
        {ID:5,recipeID:2,name:'EGGS',quantity:4.00,unitsAndStyle:''},
        {ID:6,recipeID:2,name:'SWEET POTATO',quantity:2.00,unitsAndStyle:'cups mashed'},
        {ID:7,recipeID:2,name:'SMOKE HAM',quantity:100.00,unitsAndStyle:'grams'},
        {ID:8,recipeID:2,name:'OLIVE OIL',quantity:1.00,unitsAndStyle:'tbs'}
      ]},


  { ID: 3, name: 'Yoghurt Parfait', serves: 1, steps: 'Mix brown rice and yoghurt\n' +
  'Add blueberries and almond\n' +
  'Spoon into a parfait glass to serve', remarks: '1628 KJ per serve',
    ingredients:
      [
        {ID:9,recipeID:3,name:'BROWN RICE',quantity:0.50,unitsAndStyle:'cups cooked'},
        {ID:10,recipeID:3,name:'FAT-FREE YOGHURT',quantity:100.00,unitsAndStyle:'grams'},
        {ID:11,recipeID:3,name:'BLUEBERRIES',quantity:50.00,unitsAndStyle:'grams'},
        {ID:12,recipeID:3,name:'ALMOND',quantity:30.00,unitsAndStyle:'grams'}
      ]},


  { ID: 4, name: 'Drunken chicken zoo', serves: 100, steps: '1. Cook chicken\n' +
  '2.Cook rice', remarks: 'Enjoy the festival!',
    ingredients:
      [
        {ID:13,recipeID:3,name:'CHICKEN BREAST',quantity:500.00,unitsAndStyle:'grams'},
        {ID:14,recipeID:3,name:'BALSAMIC VINEGAR',quantity:0.25,unitsAndStyle:'cup'},
        {ID:15,recipeID:3,name:'GOLD POTATO',quantity:700.00,unitsAndStyle:'grams'},
        {ID:16,recipeID:3,name:'AVOCADO',quantity:300.00,unitsAndStyle:'grams'},
        {ID:18,recipeID:3,name:'Drunken chicken',quantity:10.00,unitsAndStyle:''},
        {ID:19,recipeID:3,name:'RICE',quantity:100.00,unitsAndStyle:'kg'}
      ]},


  { ID: 5, name: 'name 200', serves: 100, steps: 'step 1 , 2, 3, 4', remarks: 'easy',
    ingredients:
      [
        {ID:17,recipeID:5,name:'ingredient',quantity:20.00,unitsAndStyle:'grams'}
      ]}
  ];
