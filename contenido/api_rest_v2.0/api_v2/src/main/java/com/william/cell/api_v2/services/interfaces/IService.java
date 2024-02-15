package com.william.cell.api_v2.services.interfaces;

import org.springframework.http.ResponseEntity;

public interface IService<D, ID> {
    
    ResponseEntity<?> getAll(int page, int size);

    ResponseEntity<?> getById(ID id);

    ResponseEntity<?> deleteById(ID id);

    ResponseEntity<?> postEntity(D dto);

    ResponseEntity<?> updateEntity(ID id, D dto);
}
