package com.api.rest.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.rest.william_cell.models.entities.Articulo;

@Repository("articuloRepository")
public interface ArticuloRepository extends JpaRepository<Articulo, String> {
    
}
