package com.william.cell.api.models.entity;

import lombok.NonNull;
import lombok.ToString;

import java.io.Serializable;

import jakarta.persistence.Column;
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

    @NonNull
    @Id
    @Column(name = "info_cliente_id")
    private String infoClienteId;

    @NonNull
    @Column(name = "primer_nombre")
    private String primerNombre;

    @Builder.Default
    @Column(name = "segundo_nombre")
    private String segundoNombre = "N/A";
    
    @NonNull
    @Column(name = "primer_apellido")
    private String primerApellido;
    
    @Builder.Default
    @Column(name = "segundo_apellido")
    private String segundoApellido = "N/A";

}
