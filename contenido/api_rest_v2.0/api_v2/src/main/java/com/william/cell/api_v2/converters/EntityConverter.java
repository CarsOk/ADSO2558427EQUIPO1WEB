package com.william.cell.api_v2.converters;

public interface EntityConverter<T, D> {
    
    T toEntity(D dto);

    D toDto(T entity);
}
