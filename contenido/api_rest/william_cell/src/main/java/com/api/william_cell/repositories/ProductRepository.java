package com.api.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.william_cell.models.entity.Producto;


public interface ProductRepository extends JpaRepository<Producto, Long> {
    
}
