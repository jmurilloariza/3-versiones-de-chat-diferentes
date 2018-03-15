/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Vista;

import com.google.gson.JsonElement;
import java.util.ArrayList;
import javax.swing.AbstractListModel;

public class CustomListModel extends AbstractListModel {

    private ArrayList<JsonElement> lista = new ArrayList<>();

    @Override
    public int getSize() {
        return lista.size();
    }

    @Override
    public Object getElementAt(int index) {
        JsonElement p = lista.get(index);
        return p.getAsJsonObject().get("nombre").getAsString();
    }

    public void addPersona(JsonElement p) {
        lista.add(p);
        this.fireIntervalAdded(this, getSize(), getSize() + 1);
    }

    public void eliminarPersona(int index0) {
        lista.remove(index0);
        this.fireIntervalRemoved(index0, getSize(), getSize() + 1);
    }

    public JsonElement getPersona(int index) {
        return lista.get(index);
    }
}
