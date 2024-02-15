package com.william.cell.api_v2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.william.cell.api_v2.models.entities.Venta;
import java.util.List;
import java.time.LocalDateTime;



public interface VentaRepository extends JpaRepository<Venta, Long> {
    
    @Query("SELECT venta FROM Venta venta WHERE venta.cliente.id = :clienteId")
    List<Venta> findByClienteId(@Param("clienteId") String clienteId);

    List<Venta> findByFechaVenta(LocalDateTime fechaVenta);

}
