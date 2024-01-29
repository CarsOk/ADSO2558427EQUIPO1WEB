package com.api.rest.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.rest.william_cell.models.entities.DocTipos;

@Repository
public interface DocsTiposRepository extends JpaRepository<DocTipos, Integer> {
    
    @Query(value = "SELECT * FROM doc_tipos WHERE doc_tipos.tipo = :tipo", nativeQuery = true)
    DocTipos findByTipo(@Param(value = "tipo") String tipo);
}
