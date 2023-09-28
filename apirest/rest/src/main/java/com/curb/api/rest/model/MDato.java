package com.curb.api.rest.model;

import com.curb.api.rest.entities.Dato;

public class MDato {
    private int id;
    private String nombre;


    public MDato() {}

    public MDato(int id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public MDato(Dato dato) {
        this.id = dato.getId();
        this.nombre = dato.getNombre(); 
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}