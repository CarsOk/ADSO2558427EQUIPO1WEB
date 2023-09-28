package com.curb.api.rest.converter;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.curb.api.rest.entities.Dato;
import com.curb.api.rest.model.MDato;

@Component("convertidor")
public class Converter {
    public List<MDato> convertToList(List<Dato> datos) {
        List<MDato> mDatos = new ArrayList<>();

        for(Dato dato : datos) {
            mDatos.add(new MDato(dato));
        }

        return mDatos;
    } 

    public MDato convertToList(Dato dato) {
        MDato mDato = new MDato(dato);
        return mDato;
    }
}
