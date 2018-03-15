package Negocio;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.LinkedList;

public class Negocio{

    private Socket session;
    private String ip;
    private int port;
    private LinkedList<JsonElement> colaMensajes;
    private String id;
    private JsonElement contactos;
    private String nombre;
    
    
    public Negocio(String ip, int port, String nombre) {
        try {
            this.ip = ip;
            this.nombre = nombre;
            this.port = port;
            session = new Socket(ip, port);
            colaMensajes = new LinkedList<JsonElement>();
            DataInputStream is = new DataInputStream(session.getInputStream());
            BufferedReader in = new BufferedReader(new InputStreamReader(is));
            id = new JsonParser().parse(in.readLine()).getAsJsonObject().get("id").getAsString();
            PrintWriter out = new PrintWriter(this.session.getOutputStream(), true);
            JsonObject object = new JsonObject();
            object.addProperty("tipo", 1);
            object.addProperty("nombre", nombre);
            out.println(object.toString());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public boolean enviarMensaje(String mensaje) {
        try {
            JsonObject object = new JsonObject();
            object.addProperty("tipo", 2);
            object.addProperty("id_emisor", this.id);
            object.addProperty("username", this.nombre);
            object.addProperty("mensaje", mensaje);
            object.addProperty("destinatario", 4);
            PrintWriter out = new PrintWriter(this.session.getOutputStream(), true);
            out.println(object.toString());
            return true;
        } catch (IOException ex) {
            ex.printStackTrace();
            return false;
        }
    }
    
     public boolean enviarMensaje(String mensaje,String destinatario) {
        try {
            JsonObject object = new JsonObject();
            object.addProperty("tipo", 3);
            object.addProperty("id_emisor", this.id);
            object.addProperty("username", this.nombre);
            object.addProperty("mensaje", mensaje);
            object.addProperty("destinatario", destinatario);
            PrintWriter out = new PrintWriter(this.session.getOutputStream(), true);
            out.println(object.toString());
            return true;
        } catch (IOException ex) {
            ex.printStackTrace();
            return false;
        }
    }
    
    public void recibirMensaje() {
        try {
            DataInputStream is = new DataInputStream(session.getInputStream());
            BufferedReader in = new BufferedReader(new InputStreamReader(is));
            JsonParser parser = new JsonParser();
            JsonElement elementPimitive = parser.parse("true");
            if (elementPimitive.isJsonPrimitive() &&
                elementPimitive.getAsJsonPrimitive().isBoolean()){
                boolean value = elementPimitive.getAsBoolean();
            }
            JsonElement respuesta = parser.parse(in.readLine());
            switch(respuesta.getAsJsonObject().get("tipo").getAsString()){
                case "2":this.colaMensajes.addFirst(respuesta);
                    break;
                case "3":this.colaMensajes.addFirst(respuesta);
                    break;
                case "4":contactos=respuesta.getAsJsonObject().get("usuarios").getAsJsonArray();
                    break;
            }
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public JsonElement getContactos() {
        return contactos;
    }

    public void setContactos(JsonElement contactos) {
        this.contactos = contactos;
    }

    public Socket getSession() {
        return session;
    }

    public void setSession(Socket session) {
        this.session = session;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public LinkedList<JsonElement> getColaMensajes() {
        return colaMensajes;
    }

    public void setColaMensajes(LinkedList<JsonElement> colaMensajes) {
        this.colaMensajes = colaMensajes;
    }

}
