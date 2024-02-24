package com.william.cell.api_v2.converters;

import com.william.cell.api_v2.models.entities.BaseEntity;
/**
 * The {@code EntityConverter} interface defines methods for converting between
 * entities and Data Transfer Objects (DTOs) in the context of the application.
 * This interface is typically implemented by converter classes responsible for
 * transforming data to and from the persistence layer.
 *
 * @param <T> The entity type extending {@code BaseEntity}.
 * @param <D> The Data Transfer Object (DTO) type.
 * @see BaseEntity
 * @see com.william.cell.api_v2.converters.EntityConverterImpl (Example implementation)
 * @since 2.0
 * @version 2.0
 * @author Emanuel Obredor
 */
public interface EntityConverter<T extends BaseEntity<?>, D> {

    /**
     * Converts a Data Transfer Object (DTO) to an entity.
     *
     * @param dto The Data Transfer Object to be converted.
     * @return An entity created from the provided DTO.
     * @since 2.0
     */
    T toEntity(D dto);

    /**
     * Converts an entity to a Data Transfer Object (DTO).
     *
     * @param entity The entity to be converted.
     * @return A Data Transfer Object created from the provided entity.
     * @since 2.0
     */
    D toDto(T entity);
}