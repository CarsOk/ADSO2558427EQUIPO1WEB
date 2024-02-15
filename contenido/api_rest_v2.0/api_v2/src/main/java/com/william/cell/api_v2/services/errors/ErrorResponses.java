package com.william.cell.api_v2.services.errors;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public final class ErrorResponses {

    private static Map<String, String> response = new LinkedHashMap<>();

    public static ResponseEntity<?> notFound() {

        response.put("Mensaje", "recurso no encontrado.");
        response.put("Detalles", "no se ha encontrado un recurso asociado al identificador indicado.");

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    public static ResponseEntity<?> internalServerError(DataAccessException e) {

        response.put("Mensaje", "error interno.");
        response.put("Detalles", e.getMessage());

        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public static ResponseEntity<?> unmodifiable() {
        response.put("Mensaje", "error interno.");
        response.put("Detalles", "ya existe un recurso con este identificador.");
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
