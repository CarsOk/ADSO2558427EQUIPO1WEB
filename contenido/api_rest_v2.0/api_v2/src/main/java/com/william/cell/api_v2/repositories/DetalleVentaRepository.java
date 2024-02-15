package com.william.cell.api_v2.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.william.cell.api_v2.models.entities.DetalleVenta;
import java.util.List;


public interface DetalleVentaRepository extends JpaRepository<DetalleVenta, Long> {
    @Query("SELECT detalle FROM DetalleVenta detalle WHERE detalle.venta.id = :ventaId")
    List<DetalleVenta> findByVentaId(@Param(value = "ventaId") Long ventaId);
}
