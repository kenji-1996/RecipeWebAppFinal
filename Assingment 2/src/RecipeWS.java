import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.*;

public class RecipeWS extends HttpServlet {

    private RecipeDSC DB = new RecipeDSC();
    private DBSettings settings = null;

	//only actualy loads the settings once
	//use getServletContext to get the full qualified path to DBSettings.txt withing the context of this web service
	//open this file using a Buffered Reader
	//get Gson to decode the entire content of this buffered reder into a DBsettings object
	//then load these settings into the database object
	//file not found and JSON encoding errors will be cought here and writen the to responce buffer (ie parameter 'out')
    private int loadDBSettings()
    {
        if (settings == null)
        {
            settings = new DBSettings();
            settings.loadJSON();
        }
        return 0;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
		//load DB connection setting from a local file
        loadDBSettings();
        System.out.println(settings);
        //TODO
		//get ID from request
        //if has id get single recipe
        //if not has id get all
        //encode using Gson and place in response
		
		//also handle exceptions and send back somthing meaningfull via the responce 
		//(ie appropriate responce code and error message that can tell your what you need to fix)
        
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        loadDBSettings();
		//TODO
		//must have valid recipe ID
		//update all recipe
		//get recipe from the DB after adding
		//create new recipe object and send back to client to confirm that the insert was successful and to pass back any generated IDs

		//also handle exceptions and send back somthing meaningfull via the responce 
		//(ie appropriate responce code and error message that can tell your what you need to fix)
        
    }

    public void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        loadDBSettings();
		//TODO
		//recipe ID must be < 0
        //add recipe to DB
		//get recipe from the DB after adding
		//create new recipe object and send back to client to confirm that the insert was successful and to pass back any generated IDs

		//also handle exceptions and send back somthing meaningfull via the responce 
		//(ie appropriate responce code and error message that can tell your what you need to fix)

    }

    public void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException
    {
        loadDBSettings();
		//TODO
        //must have ID
        //get recipe with ID
        //if recipe exists, delete recipe
        //return deleted recipe
        
		//also handle exceptions and send back somthing meaningfull via the responce 
		//(ie appropriate responce code and error message that can tell your what you need to fix)
        
    }
}
