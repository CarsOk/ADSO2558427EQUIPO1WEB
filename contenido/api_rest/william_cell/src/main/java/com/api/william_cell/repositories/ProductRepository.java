package com.api.william_cell.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.api.william_cell.models.entity.Producto;

public interface ProductRepository extends JpaRepository<Producto, String> {

    @Modifying
    @Query(value = "UPDATE productos SET product_cant = :n_product_cant WHERE product_id = :product_id", nativeQuery = true)
    int updateProductCant(@Param("n_product_cant") Integer n_product_cant, @Param("product_id") String product_id);
}

