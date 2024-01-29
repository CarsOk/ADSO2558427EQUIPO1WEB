package com.api.rest.william_cell.models.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table(name = "clientes")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Cliente implements Serializable {
    
    @Id
    @Column(length = 60)
    private String cliente_doc;

    @Column(length = 30, nullable = false)
    private String primer_nombre;

    @Column(length = 30)
    @Builder.Default
    private String segundo_nombre = "N/A";

    @Column(length = 30, nullable = false)
    private String primer_apellido;

    @Builder.Default
    @Column(length = 30)
    private String segundo_apellido = "N/A";

    @OneToOne
    @JoinColumn(name = "cliente_tipo", referencedColumnName = "tipo_id")
    private DocTipos docTipos;
}
