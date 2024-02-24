package com.william.cell.api_v2.services;

import java.io.Serializable;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.william.cell.api_v2.converters.EntityConverter;
import com.william.cell.api_v2.models.entities.BaseEntity;
import com.william.cell.api_v2.services.errors.ErrorResponses;
import com.william.cell.api_v2.services.interfaces.IService;
/**
 * The {@code BaseService} abstract class provides a foundation for service classes
 * handling CRUD operations on entities. It implements common methods defined in the
 * {@code IService} interface and provides a template for concrete service classes.
 *
 * @param <T> The entity type extending {@code BaseEntity}.
 * @param <D> The Data Transfer Object (DTO) type.
 * @param <ID> The type of the entity's identifier.
 * @since 1.0
 * @version 1.0
 * @author Your Name
 */
@Service
public abstract class BaseService<T extends BaseEntity<ID>, D, ID extends Serializable> implements IService<D, ID> {

    /**
     * Get the repository associated with the entity.
     *
     * @return The JpaRepository for the entity.
     * @since 1.0
     */
    protected abstract JpaRepository<T, ID> getRepository();

    /**
     * Get the entity converter for mapping between entity and DTO.
     *
     * @return The entity converter for the entity.
     * @since 1.0
     */
    protected abstract EntityConverter<T, D> getEntityConverter();

    /**
     * Retrieve a paginated list of all entities.
     *
     * @param page The page number (zero-based).
     * @param size The number of entities to be retrieved per page.
     * @return A {@code ResponseEntity} containing the paginated list of entities.
     * @since 1.0
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<?> getAll(int page, int size) {
        try {
            PageRequest pageable = PageRequest.of(page, size);
            Page<T> resultPage = getRepository().findAll(pageable);

            return new ResponseEntity<>(resultPage.getContent(), HttpStatus.OK);

        } catch (DataAccessException e) {
            return new ResponseEntity<>("Error " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Delete a specific entity by its identifier.
     *
     * @param id The identifier of the entity to be deleted.
     * @return A {@code ResponseEntity} indicating the result of the delete operation.
     * @since 1.0
     */
    @Transactional
    @Override
    public ResponseEntity<?> deleteById(ID id) {
        try {
            if (getRepository().findById(id) != null) {
                getRepository().deleteById(id);
                return new ResponseEntity<>("Resource deleted successfully.", HttpStatus.OK);
            }
            return ErrorResponses.notFound();
        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

    /**
     * Retrieve a specific entity by its identifier.
     *
     * @param id The identifier of the entity to be retrieved.
     * @return A {@code ResponseEntity} containing the retrieved entity.
     * @since 1.0
     */
    @Transactional(readOnly = true)
    @Override
    public ResponseEntity<?> getById(ID id) {
        try {

            if (getRepository().findById(id) != null) {
                return new ResponseEntity<>(getRepository().findById(id).orElse(null),
                        HttpStatus.OK);
            }

            return ErrorResponses.notFound();

        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

    /**
     * Create a new entity based on the provided Data Transfer Object (DTO).
     *
     * @param dto The Data Transfer Object containing information to create the entity.
     * @return A {@code ResponseEntity} indicating the result of the post operation.
     * @since 1.0
     */
    @Transactional
    @Override
    public ResponseEntity<?> postEntity(D dto) {
        try {
            T entity = getEntityConverter().toEntity(dto);

            if (getRepository().findById(entity.obtenerEntityId()).isEmpty()) {
                return new ResponseEntity<>(getRepository().save(entity), HttpStatus.CREATED);
            }

            return ErrorResponses.unmodifiable();
        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

    /**
     * Update a specific entity by its identifier using the provided Data Transfer Object (DTO).
     *
     * @param id The identifier of the entity to be updated.
     * @param dto The Data Transfer Object containing updated information.
     * @return A {@code ResponseEntity} indicating the result of the update operation.
     * @since 1.0
     */
    @Transactional
    @Override
    public ResponseEntity<?> updateEntity(ID id, D dto) {
        try {
            T entityEncontrado = getRepository().findById(id).orElse(null);

            if (entityEncontrado != null) {
                T entity = getEntityConverter().toEntity(dto);
                entity.asignarEntityId(id);
                return new ResponseEntity<>(getRepository().save(entity), HttpStatus.OK);
            }

            return ErrorResponses.notFound();

        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }
}

