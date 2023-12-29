package com.api.william_cell.models.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Table(name = "productos")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Producto implements Serializable{
    
    @Id
    private String product_id;

    private String product_nombre;

    private Integer product_cant;

    private Long product_precio;
}
