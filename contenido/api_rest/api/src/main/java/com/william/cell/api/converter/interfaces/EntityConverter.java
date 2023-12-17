package com.william.cell.api.converter.interfaces;

public interface EntityConverter<T, D>{
    
    T toEntity(D dto);

    D toDto(T entity);
}
