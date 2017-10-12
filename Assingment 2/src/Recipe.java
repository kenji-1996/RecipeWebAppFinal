import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.util.ArrayList;
import java.util.List;

public class Recipe
{
	public void setID(int ID) {
		this.ID = ID;
	}

	private int ID;
	private String name;
	private int serves;
	private List<Ingredient> ingredients;
	private String steps;
	private String remarks;

	public void removeIngredient(Ingredient i)
	{
		ingredients.remove(i);
	}

	public Ingredient getIngredientByID(int ingID)
	{
		for (Ingredient I: ingredients)
		{
			if (I.getID() == ingID)
			{
				return  I;
			}
		}
		return null;
	}

	public Recipe(int ID, String name, int serves, String steps, String remarks)
	{
		this.ID = ID;
		this.name = name;
		this.serves = serves;
		this.steps = steps;
		this.remarks = remarks;
		this.ingredients = new ArrayList<>();
	}
	public Recipe(String name, int serves, String steps, String remarks)
	{
		this.ID = -1;
		this.name = name;
		this.serves = serves;
		this.steps = steps;
		this.remarks = remarks;
		this.ingredients = new ArrayList<>();
	}

	public Recipe(){
		this.ID = -1;
		this.name = "";
		this.serves = 0;
		this.steps = "";
		this.remarks = "";
		this.ingredients = new ArrayList<>();
	}

	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public int getID()
	{
		return ID;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public int getServes()
	{
		return serves;
	}

	public void setServes(int serves)
	{
		this.serves = serves;
	}

	public String getIngredients(String indent)
	{
		String ingredientsStr = "";
		for (Ingredient I: ingredients)
		{
			ingredientsStr += I.toString(indent) + "\n";
		}
		return ingredientsStr;
	}
	public String getIngredientNamesList()
	{
		if (ingredients.size()<1) return "--no ingredients--";
		String ingredientsStr = ingredients.get(0).getName();
		for (int i = 1; i < ingredients.size(); i ++ )
		{
			ingredientsStr += ", " + ingredients.get(i).getName();
		}
		return ingredientsStr;
	}

	public ObservableList<Ingredient> getObservableListOfIngredients()
	{
		return FXCollections.observableArrayList(ingredients);
	}

	public void setIngredients(List<Ingredient> newIngredientList)
	{
		 this.ingredients = newIngredientList;
	}

	public void clearIngredients()
	{
		this.ingredients = new ArrayList<>();
	}

	public void addIngredient(Ingredient ingredient)
	{
		this.ingredients.add(ingredient);
	}

	public String getSteps()
	{
		return steps;
	}

	public void setSteps(String steps)
	{
		this.steps = steps;
	}

	public String getRemarks()
	{
		return remarks;
	}

	public void setRemarks(String remarks)
	{
		this.remarks = remarks;
	}

	public void update(String name, int serves,
		String steps, String remarks)
	{
		this.name = name;
		this.serves = serves;
		this.steps = steps;
		this.remarks = remarks;
	}

	@Override
	public String toString()
	{
		return "\nRecipe{\n\t" +
		  "id: " + ID + "\n\t" +
		  "name: " + name + "\n\t" +
		  "serves: " + serves + "\n\t" +
		  "ingredients: " + "\n\t" +
				getIngredients("\t") +
		  "steps: " +  steps  + "\n\t" +
		  "remarks = " + remarks + "}\n";
	}

	@Override
	public boolean equals(Object obj)
	{
		return
			obj != null &&
			obj instanceof Recipe &&
			((Recipe) obj).getID() == this.ID;
	}
}