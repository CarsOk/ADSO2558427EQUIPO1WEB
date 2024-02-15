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

@Service
public abstract class BaseService<T extends BaseEntity<ID>, D, ID extends Serializable> implements IService<D, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    protected abstract EntityConverter<T, D> getEntityConverter();

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

    @Transactional
    @Override
    public ResponseEntity<?> deleteById(ID id) {
        try {
            if (getRepository().findById(id) != null) {
                getRepository().deleteById(id);
                return new ResponseEntity<>("Recurso eliminado exitosamente.", HttpStatus.OK);
            }
            return ErrorResponses.notFound();
        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

    @Transactional(readOnly = true)
    @Override
    public ResponseEntity<?> getById(ID id) {
        try {

            if (getRepository().findById(id) != null) {
                return new ResponseEntity<>(getEntityConverter().toDto(getRepository().findById(id).orElse(null)),
                        HttpStatus.OK);
            }

            return ErrorResponses.notFound();

        } catch (DataAccessException e) {
            return ErrorResponses.internalServerError(e);
        }
    }

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
