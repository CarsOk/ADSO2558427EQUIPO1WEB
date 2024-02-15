package com.william.cell.api_v2.models.entities;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "productos")
public class Producto implements BaseEntity<String>, Serializable {

    @Id
    @Column(length = 150)
    private String productoId;

    @Column(nullable = false, length = 60)
    private String nombre;
    
    @Column(nullable = true, columnDefinition = "TEXT", length = 200)
    private String descripcion;
    
    @Column(nullable = false, length = 200)
    private BigDecimal precio;
    
    @Column(nullable = false)
    private int stockActual;

    @Override
    public String obtenerEntityId() {
        return this.productoId;
    }

    @Override
    public void asignarEntityId(String id) {
        this.productoId = id;
    }

}
