package com.william.cell.api_v2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.william.cell.api_v2.models.entities.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, String> {
    
}
