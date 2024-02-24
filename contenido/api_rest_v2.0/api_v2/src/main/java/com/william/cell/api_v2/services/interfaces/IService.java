package com.william.cell.api_v2.services.interfaces;

import org.springframework.http.ResponseEntity;
/**
 * The {@code IService} interface defines a set of common operations for service classes
 * responsible for handling CRUD (Create, Read, Update, Delete) operations on entities.
 *
 * @param <D> The Data Transfer Object (DTO) type associated with the entity.
 * @param <ID> The type of the entity's identifier.
 * @since 1.0
 * @version 1.0
 * @author Your Name
 */
public interface IService<D, ID> {
    
    /**
     * Retrieve a paginated list of all entities.
     *
     * @param page The page number (zero-based).
     * @param size The number of entities to be retrieved per page.
     * @return A {@code ResponseEntity} containing the paginated list of entities.
     * @since 1.0
     */
    ResponseEntity<?> getAll(int page, int size);

    /**
     * Retrieve a specific entity by its identifier.
     *
     * @param id The identifier of the entity to be retrieved.
     * @return A {@code ResponseEntity} containing the retrieved entity.
     * @since 1.0
     */
    ResponseEntity<?> getById(ID id);

    /**
     * Delete a specific entity by its identifier.
     *
     * @param id The identifier of the entity to be deleted.
     * @return A {@code ResponseEntity} indicating the result of the delete operation.
     * @since 1.0
     */
    ResponseEntity<?> deleteById(ID id);

    /**
     * Create a new entity based on the provided Data Transfer Object (DTO).
     *
     * @param dto The Data Transfer Object containing information to create the entity.
     * @return A {@code ResponseEntity} indicating the result of the post operation.
     * @since 1.0
     */
    ResponseEntity<?> postEntity(D dto);

    /**
     * Update a specific entity by its identifier using the provided Data Transfer Object (DTO).
     *
     * @param id The identifier of the entity to be updated.
     * @param dto The Data Transfer Object containing updated information.
     * @return A {@code ResponseEntity} indicating the result of the update operation.
     * @since 1.0
     */
    ResponseEntity<?> updateEntity(ID id, D dto);
}
