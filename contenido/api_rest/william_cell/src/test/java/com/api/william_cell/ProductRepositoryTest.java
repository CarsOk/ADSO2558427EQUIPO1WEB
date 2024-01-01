package com.api.william_cell;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import com.api.william_cell.controllers.UsuarioController;
import com.api.william_cell.repositories.ProductRepository;
import com.api.william_cell.repositories.UsuarioRepository;
import com.api.william_cell.services.UsuarioService;

@SpringBootTest
public class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Test
    @Transactional
    public void testUpdateProductCant() {
        // Supongamos que tienes un producto con el ID "123457" en tu base de datos
        String productId = "123457";
        
        // Ejecutas la actualización
        int rowsAffected = productRepository.updateProductCant(5, productId);

        // Verificas que una fila fue afectada (puedes ajustar esto según tus datos)
        assertEquals(1, rowsAffected);
        
        // Puedes realizar más aserciones según tus necesidades para verificar el estado actualizado del producto
    }
}
