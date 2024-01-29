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
@Entity
@Table(name = "doc_tipos")
public class DocTipos implements Serializable {
    
    @Id
    private Integer tipo_id;

    @Column(length = 2, nullable = false)
    private String tipo;
}
