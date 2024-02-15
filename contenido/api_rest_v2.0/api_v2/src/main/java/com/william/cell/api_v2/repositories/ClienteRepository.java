package com.william.cell.api_v2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.william.cell.api_v2.models.entities.Cliente;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, String> {
    
}
