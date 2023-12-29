package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/v1")
public interface BaseController<T, D, ID> {

    default ResponseEntity<?> create(T entity) {
        throw new UnsupportedOperationException("Implementación vacía");
    };

    default ResponseEntity<?> update(ID id, T entity) {
        throw new UnsupportedOperationException("Implementación vacía");
    };

    default ResponseEntity<?> delete(ID id) {
        throw new UnsupportedOperationException("Implementación vacía");
    };

    default ResponseEntity<?> showById(ID id) {
        throw new UnsupportedOperationException("Implementación vacía");
    };

    default List<D> findAll() {
        throw new UnsupportedOperationException("Implementación vacía");
    };
}
