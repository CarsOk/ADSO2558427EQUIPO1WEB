package com.api.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.william_cell.models.entity.ClienteContact;


@Repository
public interface ClienteContactRepository extends JpaRepository<ClienteContact, Long> {

}
