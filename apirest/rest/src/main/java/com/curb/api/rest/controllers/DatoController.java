package com.curb.api.rest.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.curb.api.rest.entities.Dato;
import com.curb.api.rest.model.MDato;
import com.curb.api.rest.services.DatoService;

@Validated
@RestController
@RequestMapping("/rest/v1")
public class DatoController {

    @Autowired
    @Qualifier("servicio")
    DatoService datoService;


    @PostMapping("/postdato")
    public boolean agregarNota(@RequestBody Dato dato) {
        return datoService.crear(dato);
    }

    @PostMapping("/updatedato")
    public boolean actualizarDato(@RequestBody Dato dato) {
        return datoService.actualizar(dato);
    }

    @DeleteMapping("/deletedato")
    public boolean borrarDato(@RequestBody Dato dato) {
        return datoService.borrar(dato.getId());
    }

    @GetMapping("/getdatos")
    public List<MDato> obtenerDatos() {
        return datoService.obtener();
    }

    @GetMapping("/getdato")
    public MDato obtenerDato(@RequestBody Dato dato) {
        return datoService.obtenerDatoPorId(dato);
    }
}
