package Vista;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.nio.charset.StandardCharsets;

/**
 *
 * @author victor-pc
 */
public class chat_cliente {

    public static void main(String[] args) throws IOException {
        JsonObject object = new JsonObject();
        object.addProperty("id", "Pedro");
        object.addProperty("mensaje", 22);
        object.addProperty("destinatario", "luis");
        String json = object.toString();
        System.out.println(json);
        Socket cliente = new Socket("192.168.0.32", 3000);
        DataInputStream dato=new DataInputStream(cliente.getInputStream());
        System.out.println( dato.readLine());
        while(true){
            
        }
        /* JsonElement elementObject = new JsonParser().parse(in.readLine());
        System.out.println(elementObject.getAsJsonObject().toString());
         */

    }

}
