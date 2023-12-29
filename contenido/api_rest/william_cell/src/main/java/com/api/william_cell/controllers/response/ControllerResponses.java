package com.api.william_cell.controllers.response;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public abstract class ControllerResponses<T> {

    private Map<String, String> response = new LinkedHashMap<>();

    public ResponseEntity<?> nonModifiableId(T entity) {
        response.put("mensaje", "El id de '"+entity.getClass().getSimpleName()+"' no se puede modificar");
        response.put("detalles", "El identicador de cada '"+entity.getClass().getSimpleName()+"' es único y no se puede modificar." +
        " Intente agregar el mismo id de o elimine esta entidad y creela nuevamente.");
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> idNotFound() {
        response.put("mensaje", "id no encontrado");
        response.put("detalles", "intente insertar un id registrado");
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<?> internalServerError(Exception e) {
        response.put("mensaje", "ha ocurrido un error durante la ejecución de la petición.");
        response.put("detalles", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public ResponseEntity<?> successfullyDeleted() {
        response.put("mensaje", "recurso eliminado exitosamente");
        response.put("detalles", "");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<?> soldOut() {
        response.put("mensaje", "producto agotado");
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    public ResponseEntity<?> badRequest(Exception e) {
        response.put("mensaje", "error en la petición");
        response.put("detalles", e.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
