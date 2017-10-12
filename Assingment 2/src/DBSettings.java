import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import java.io.*;
import java.util.Iterator;
import java.util.Map;


public class DBSettings {
    private String DBURL;
    private String userName;
    private String password;

    public String getDBURL() {

        return DBURL;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }

    public void setDBURL(String DBURL) {
        this.DBURL = DBURL;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void loadJSON() {
        JSONParser parser = new JSONParser();
        try {
            Object obj = parser.parse(new FileReader("DBSettings.txt"));

            JSONObject jsonObject = (JSONObject) obj;

            String url = (String) jsonObject.get("DBURL");
            this.setDBURL(url);

            String userName = (String) jsonObject.get("userName");
            this.setUserName(userName);

            String password = (String) jsonObject.get("password");
            this.setPassword(password);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
