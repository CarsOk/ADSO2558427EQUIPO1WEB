package com.api.william_cell.services;

import java.util.List;

public interface IService<T, D, ID> {
    void deleteEntity(T entity);

    D saveEntity(T entity);

    List<D> findAllEntities();

    D findEntityById(ID id);
}
