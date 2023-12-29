package com.api.william_cell.converter.interfaces;

public interface EntityConverter<T, D>{
    
    T toEntity(D dto);

    D toDto(T entity);
}
