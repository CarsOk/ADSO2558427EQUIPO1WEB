package com.api.rest.william_cell;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import com.api.rest.william_cell.models.entities.DocTipos;
import com.api.rest.william_cell.repositories.DocsTiposRepository;
import com.api.rest.william_cell.services.DocsTiposService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

@SpringBootTest
public class DocsTiposServiceTest {

    @Autowired
    private DocsTiposService docsTiposService;

    @MockBean
    private DocsTiposRepository docsTiposRepository;

    @Test
    public void testGetByTipo() {
        // Configurar el comportamiento simulado del repositorio
        String tipo = "CC";
        DocTipos mockDocTipos = new DocTipos();
        mockDocTipos.setTipo(tipo);

        when(docsTiposRepository.findByTipo(tipo)).thenReturn(mockDocTipos);

        // Ejecutar el método de servicio y verificar el resultado
        DocTipos result = docsTiposService.getByTipo(tipo);
        assertEquals(tipo, result.getTipo());
    }
}