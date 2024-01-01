package com.api.william_cell.models.entity;

import java.io.Serializable;

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
import lombok.ToString;

@Table(name = "usuarios")
@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Usuario implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long usuario_id;

    private String usuario_nombre;

    private String usuario_contrasena;

    @ManyToOne
    @JoinColumn(name = "rol_id")
    private Rol rol;
}
