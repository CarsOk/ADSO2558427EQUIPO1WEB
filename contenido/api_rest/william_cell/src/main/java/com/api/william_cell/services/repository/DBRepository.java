package com.api.william_cell.services.repository;

import java.util.List;

public interface DBRepository <T, D, ID> {
    
    D saveEntity(T entity);

    D findEntityById(ID id);

    void deleteEntity(T entity);
                        
    List<D> findAllEntities();
}
