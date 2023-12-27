package com.api.william_cell.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;

public interface IController<T, D, ID> {

    D create(T entity);

    ResponseEntity<?> update(ID id, T entity);

    ResponseEntity<?> delete(Long id);

    ResponseEntity<?> showById(Long id);

    List<D> findAll();
}
