package com.william.cell.api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.william.cell.api.models.entity.Cliente;


@Repository
public interface ClienteRepository extends CrudRepository<Cliente, String> {}