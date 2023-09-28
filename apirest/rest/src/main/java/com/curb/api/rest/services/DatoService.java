package com.curb.api.rest.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.curb.api.rest.converter.Converter;
import com.curb.api.rest.entities.Dato;
import com.curb.api.rest.model.MDato;
import com.curb.api.rest.repository.DatoRepositorio;


@Service("servicio")
public class DatoService {

    @Autowired
    @Qualifier("repositorio")
    private DatoRepositorio repositorio;

    @Autowired
    @Qualifier("convertidor")
    private Converter convertidor;

    public boolean crear(Dato dato) {
        try {
            repositorio.save(dato);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean borrar(int id) {
        try {
            Dato dato = repositorio.findById(id);
            repositorio.delete(dato);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean actualizar(Dato dato) {
        try {
            repositorio.save(dato);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<MDato> obtener() {
        return convertidor.convertToList(repositorio.findAll());
    }

    public MDato obtenerDatoPorId(Dato dato) {
        return new MDato(repositorio.findById(dato.getId()));
    }
}
