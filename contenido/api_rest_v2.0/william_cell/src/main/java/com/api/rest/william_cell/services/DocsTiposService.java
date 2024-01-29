package com.api.rest.william_cell.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.rest.william_cell.models.entities.DocTipos;
import com.api.rest.william_cell.repositories.DocsTiposRepository;

@Service
public class DocsTiposService {
    
    @Autowired
    DocsTiposRepository docsTiposRepository;

    public DocTipos getByTipo(String tipo) {
        return docsTiposRepository.findByTipo(tipo);
    }
}
