package com.api.william_cell.models.entity;

import lombok.ToString;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@ToString
@Data
@Entity
@Table(name = "clientes")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Cliente implements Serializable{

    @Id
    private String cliente_id;

    private String primer_nombre;

    @Builder.Default
    private String segundo_nombre = "N/A";
    
    private String primer_apellido;
    
    private String segundo_apellido;

}
