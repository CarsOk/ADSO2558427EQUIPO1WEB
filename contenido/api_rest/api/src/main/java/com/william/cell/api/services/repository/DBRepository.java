package com.william.cell.api.services.repository;

import java.util.List;

public interface DBRepository <T, D, ID> {
    
    T saveEntity(D dto);

    T findEntityById(ID id);

    void deleteEntity(T entity);
                        
    List<D> findAllEntities();
}
