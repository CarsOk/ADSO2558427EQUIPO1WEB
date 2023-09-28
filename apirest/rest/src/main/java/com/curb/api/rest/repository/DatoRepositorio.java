package com.curb.api.rest.repository;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.curb.api.rest.entities.Dato;


@Repository("repositorio")
public interface DatoRepositorio extends JpaRepository<Dato, Serializable>{
    public abstract Dato findById(int id);
}