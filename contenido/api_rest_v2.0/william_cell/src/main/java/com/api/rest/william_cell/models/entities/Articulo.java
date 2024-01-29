package com.api.rest.william_cell.models.entities;

import java.io.Serializable;

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
@Table(name = "articulos")
@Entity
public class Articulo implements Serializable{
    
    @Id
    @Column(length = 100)
    private String arti_id;

    @Column(length = 50)
    private String arti_nombre;

    private Long arti_cant;

    private Long arti_unit;
}
