package com.william.cell.api_v2.controllers.interfaces;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.william.cell.api_v2.models.entities.BaseEntity;
import com.william.cell.api_v2.services.BaseService;

import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v2/base")
public class BaseController<T extends BaseEntity<ID>, D, ID extends Serializable> {

    @Autowired
    protected BaseService<T, D, ID> service;

    @GetMapping("/all")
    public ResponseEntity<?> getAll(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "10") int size) {
        return service.getAll(page, size);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<?> findById(@PathVariable(name = "id") ID id) {
        return service.getById(id);
    }

    @PostMapping("/new")
    public ResponseEntity<?> post(@RequestBody D dto) {
        return service.postEntity(dto);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateById(@PathVariable(name = "id") ID id, @RequestBody D dto) {
        return service.updateEntity(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteById(@PathVariable(name = "id") ID id) {
        return service.deleteById(id);
    }

    @Autowired
    public void setService(BaseService<T, D, ID> service) {
        this.service = service;
    }
}
