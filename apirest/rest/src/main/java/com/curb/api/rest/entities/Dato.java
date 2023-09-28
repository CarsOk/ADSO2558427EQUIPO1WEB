package com.curb.api.rest.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "datos")
@Entity
public class Dato implements Serializable{
    @GeneratedValue
    @Id
    @Column(name = "id")
    private int id = 0;

    @Column(name = "nombre")
    private String nombre;


    public Dato() {}

    public Dato(int id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }


    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

}
