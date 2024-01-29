package com.api.rest.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.rest.william_cell.models.entities.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, String> {
    
}
