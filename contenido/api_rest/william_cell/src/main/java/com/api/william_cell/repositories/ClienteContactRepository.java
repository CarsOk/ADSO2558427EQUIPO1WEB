package com.api.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.william_cell.models.entity.ClienteContact;
import java.util.List;



@Repository("clienteContactRepository")
public interface ClienteContactRepository extends JpaRepository<ClienteContact, Long> {
    
    @Query("SELECT cc FROM ClienteContact cc JOIN cc.cliente c WHERE c.cliente_id = :cliente_id")
    List<ClienteContact> findByClienteId(@Param("cliente_id") String cliente_id);

}
