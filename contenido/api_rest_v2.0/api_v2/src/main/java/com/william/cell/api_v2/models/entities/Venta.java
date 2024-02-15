package com.william.cell.api_v2.models.entities;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "ventas")
public class Venta implements BaseEntity<Long>, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long venta_id;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "DATETIME")
    private LocalDateTime fechaVenta = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @Column(nullable = false)
    private BigDecimal totalVenta;
    
    @Column(nullable = true)
    private BigDecimal descuento;
    
    @Column(nullable = false, length = 15)
    private String metodoPago;

    @Override
    public Long obtenerEntityId() {
        return this.venta_id;
    }

    @Override
    public void asignarEntityId(Long id) {
        this.venta_id = id;
    }
}
