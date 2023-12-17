package com.william.cell.api.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository<T, ID> extends CrudRepository<T, ID>{}