//import javafx.stage.Stage;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.*;

import java.util.ArrayList;
import java.util.List;

public class RecipeDSC
{
	private  Connection connection;
	private  Statement statement;
	private  PreparedStatement preparedStatement;
	private DBSettings dbSetting = null;

	public RecipeDSC() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (Exception e) {
			System.out.println("failed to lode mysql driver");
			System.out.println(e.getMessage());
			System.out.println(e.getStackTrace().toString());
		}
	}

	public void load()
	{
		DBSettings settings = new DBSettings();
		settings.loadJSON();
		dbSetting = settings;
	}

	public  void connect() throws SQLException
	{
	    try {
            load();
            connection = DriverManager.getConnection(dbSetting.getDBURL(), dbSetting.getUserName(), dbSetting.getPassword());
            statement = connection.createStatement();
        } catch (Exception ex) { ex.printStackTrace(); }
	}

	public  void disconnect() throws SQLException
	{
		if (preparedStatement != null) preparedStatement.close();
		if (statement != null) statement.close();
		if (connection != null) connection.close();
	}

	/*
	 * TODO: This method should find a Recipe with the given id.
	 * @param id The id of the Recipe to be found.
	 * @return The Recipe with the given id if it exists. Otherwise return null.
	 * @throws SQLException
	 *	(May or may not be needed for the GUI part)
	 */
	public Recipe findRecipe(int id) throws SQLException
	{
		connect();
		ResultSet rs = statement.executeQuery(
			"SELECT ID, name, serves, steps, remarks FROM recipes WHERE ID = " + id);

		boolean hasRecords = rs.next();
		Recipe recipe = null;
		if(hasRecords)
		{
			recipe =  new Recipe(
				rs.getInt("ID"),
				rs.getString("name"),
				rs.getInt("serves"),
				rs.getString("steps"),
				rs.getString("remarks"));

			rs = statement.executeQuery("SELECT ID, name, quantity, unitsAndStyle FROM recipeIngredients WHERE recipeID = " + recipe.getID() + ";");
			while(rs.next())
			{
				int ingredientID = rs.getInt("ID");
				String ingredientName = rs.getString("name");
				double quantity = rs.getDouble("quantity");
				String unitsAndStyle = rs.getString("unitsAndStyle");
				recipe.addIngredient(new Ingredient(ingredientID, ingredientName, quantity, unitsAndStyle));
			}
		}

		disconnect();
		return recipe;
	}


	/*
	 * TODO: This method should count the total number of Recipes in the database
	 * @return An int representing the number of Recipes
	 * @throws SQLException
	 * (May or may not be needed for the GUI part)
	 */
	public int countRecipes() throws SQLException
	{
		connect();
		ResultSet rs = statement.executeQuery(
			"select * from recipes");
		int count =  rs.last()? rs.getRow(): 0;
		disconnect();
		return count;
	}


	/**
	 * TODO: This method should obtain the list of all Recipes from the database
	 * @return A list of all stored Recipes
	 * @throws SQLException
	 */
	public List<Recipe> findAllRecipes() throws SQLException
	{
		connect();

		String queryString = "SELECT ID, name, serves, steps, remarks FROM recipes";
		ResultSet rs = statement.executeQuery(queryString);

		List<Recipe> recipes = new ArrayList<Recipe>();

		while (rs.next())
		{
			int ID = rs.getInt("ID");
			String name = rs.getString("name");
			int serves = rs.getInt("serves");
			String steps = rs.getString("steps");
			String remarks = rs.getString("remarks");

			Recipe currentRecipe = new Recipe(ID, name, serves, steps, remarks);
			recipes.add(currentRecipe);

		}

		for(Recipe R: recipes)
		{
			queryString = "SELECT ID, name, quantity, unitsAndStyle FROM recipeIngredients WHERE recipeID = " + R.getID() + ";";
			ResultSet ingredients = statement.executeQuery(queryString);
			while (ingredients.next())
			{
				int ingredientID = ingredients.getInt("ID");
				String ingredientName = ingredients.getString("name");
				double quantity = ingredients.getDouble("quantity");
				String unitsAndStyle = ingredients.getString("unitsAndStyle");
				R.addIngredient(new Ingredient(ingredientID, ingredientName, quantity, unitsAndStyle));
			}
		}



		disconnect();
		return recipes;
	}

	public int addRecipe(Recipe recipe) throws SQLException
	{
		int newRecipyID = addRecipe(recipe.getName(), recipe.getServes(), recipe.getSteps(), recipe.getRemarks());
		for(Ingredient i : recipe.getIngredients())
		{
			if(!i.isDeleted()) {
				addIngredient(i,newRecipyID);
			}
			else {
				//do nothing
			}
		}

		return newRecipyID;
	}

	/*
	 * TODO: This method should try to add the given Recipe to the database.
	 * Note: The ID of this Recipe must be unique
	 * @param recipe The recipe to be added
	 * @throws SQLException
	 */

	public int addRecipe(String name, int serves, String steps, String remarks) throws SQLException
	{
		connect();

		String command = "INSERT INTO recipes (name, serves, steps, remarks) VALUES(?, ?, ?, ?)";
		preparedStatement = connection.prepareStatement(command, Statement.RETURN_GENERATED_KEYS);
		preparedStatement.setString(1, name);
		preparedStatement.setInt(2, serves);
		preparedStatement.setString(3, steps);
		preparedStatement.setString(4, remarks);

		System.out.println(preparedStatement);
		preparedStatement.executeUpdate();
		ResultSet rs = preparedStatement.getGeneratedKeys();
		rs.next();
		int newId = rs.getInt(1);

		disconnect();
		return newId;
	}

	public int addIngredient(int recipeID, String name, double quantity, String unitsAndStyle) throws SQLException
	{
		connect();
		String command = "INSERT INTO recipeIngredients (recipeID, name, quantity, unitsAndStyle) Values (?,?,?,?);";
		preparedStatement = connection.prepareStatement(command, Statement.RETURN_GENERATED_KEYS);
		preparedStatement.setInt(1, recipeID);
		preparedStatement.setString(2, name);
		preparedStatement.setDouble(3, quantity);
		preparedStatement.setString(4, unitsAndStyle);

		preparedStatement.executeUpdate();
		ResultSet rs = preparedStatement.getGeneratedKeys();
		rs.next();
		int newId = rs.getInt(1);

		disconnect();
		return newId;
	}

	public int addIngredient(Ingredient ingredient, int recipeID) throws SQLException
	{
		return addIngredient(recipeID, ingredient.getName(),ingredient.getQuantity(), ingredient.getUnitsAndStyle());
	}

	/**
	 * TODO: This method should try to update an existing Recipe using the
	 * details provided by the given Recipe parameter.
	 * @param recipe The Recipe to be updated (in fact, it can be a proxy)
	 * @throws SQLException
	 */
	public void updateRecipe(Recipe recipe) throws SQLException
	{
		connect();
		//System.out.println((new Gson()).toJson(recipe));

		String command = "UPDATE recipes SET name = ?, serves = ?, " +
			"steps = ?, remarks = ? WHERE ID = ?";
		preparedStatement = connection.prepareStatement(command);

		preparedStatement.setString(1, recipe.getName());
		preparedStatement.setInt(2, recipe.getServes());
		preparedStatement.setString(3, recipe.getSteps());
		preparedStatement.setString(4, recipe.getRemarks());
		preparedStatement.setInt(5, recipe.getID());

		preparedStatement.executeUpdate();
		for (Ingredient i: recipe.getObservableListOfIngredients())
		{

			if (i.getID() >= 0)
			{
				if (i.isDeleted()) {
					deleteIngredient(i);
				}
				else {
					updateIngredient(i);
				}
			}
			else
			{
				if(!i.isDeleted()) {
					addIngredient(i,recipe.getID());
				}
				else {
					//do nothing
				}
			}
		}

		disconnect();
	}

	public void updateIngredient(int ingredientID, String name, double quantity, String unitsAndStyle) throws SQLException
	{
		String command = "UPDATE recipeIngredients SET name = ?, quantity = ?, " +
				"unitsAndStyle = ? WHERE ID = ?";
		preparedStatement = connection.prepareStatement(command);

		preparedStatement.setString(1, name);
		preparedStatement.setDouble(2, quantity);
		preparedStatement.setString(3, unitsAndStyle);
		preparedStatement.setInt(4, ingredientID);

		preparedStatement.executeUpdate();
	}

	public void updateIngredient(Ingredient ingredient) throws SQLException
	{
		updateIngredient(ingredient.getID(),ingredient.getName(), ingredient.getQuantity(), ingredient.getUnitsAndStyle());
	}

	public void deleteIngredient(int ingredientID) throws SQLException
	{
		String command = "DELETE FROM recipeIngredients WHERE ID=?";
		preparedStatement = connection.prepareStatement(command);
		preparedStatement.setInt(1, ingredientID);

		preparedStatement.executeUpdate();
	}
	public void deleteIngredient(Ingredient ingredient) throws SQLException
	{
		deleteIngredient(ingredient.getID());
	}


	public void deleteRecipe(int ID) throws SQLException, RuntimeException
	{
		// TO DO HERE: Check the precodition first

		connect();
		ResultSet rs = statement.executeQuery(
			"select count(*) from recipes where ID = " + ID);
		boolean pre = rs.next();
		if(! pre)
		{
			throw new RuntimeException("The recipe does not exist!");
		}
		statement.executeUpdate("delete from  recipeIngredients where recipeID = " + ID);
		statement.executeUpdate("delete from  recipes where ID = " + ID);
		disconnect();
	}

	public static void main(String [] args) throws Exception
	{
		RecipeDSC dsc = new RecipeDSC();
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ Test 1 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

		List<Recipe> list = dsc.findAllRecipes();
		System.out.println(list);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ Test 2 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

		Recipe recipe = dsc.findRecipe(4);
		System.out.println(recipe);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ Test 3 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

		recipe = dsc.findRecipe(100);
		System.out.println(recipe);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ Test 4 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

		int ID = dsc.addRecipe("name 200", 100, "step 1 , 2, 3, 4", "easy");
		System.out.println("ID: " + ID);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_- Test 5 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

		int ingredientID = dsc.addIngredient(ID, "ingredient", 20, "grams");
		System.out.println("ingredientID: " + ingredientID);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ Test 6 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");

		recipe = dsc.findRecipe(4);
		recipe.setName("Drunken chicken zoo");
		recipe.setServes(100);
		Ingredient i = new Ingredient();
		i.setName("Drunken chicken");
		i.setQuantity(10);
		i.setUnitsAndStyle("");
		recipe.addIngredient(i);
		i = new Ingredient();
		i.setName("RICE");
		i.setQuantity(100);
		i.setUnitsAndStyle("kg");
		recipe.addIngredient(i);

		recipe.setSteps("\n1. Cook chicken\n2.Cook rice");
		recipe.setRemarks("Enjoy the festival!");

		System.out.println(">>> updated recipe: " + recipe);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_ Test 7 _-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");


		dsc.updateRecipe(recipe);
		recipe = dsc.findRecipe(4);
		System.out.println(">>> updated recipe from database: " + recipe);
		System.out.println("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
	}

}
