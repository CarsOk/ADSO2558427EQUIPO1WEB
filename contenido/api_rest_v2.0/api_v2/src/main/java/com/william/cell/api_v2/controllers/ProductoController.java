package com.william.cell.api_v2.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.cell.api_v2.controllers.interfaces.BaseController;
import com.william.cell.api_v2.models.DTO.ProductoDTO;
import com.william.cell.api_v2.models.entities.Producto;

@RestController
@RequestMapping("/api/v2/producto")
public class ProductoController extends BaseController<Producto, ProductoDTO, String>{ 

}
