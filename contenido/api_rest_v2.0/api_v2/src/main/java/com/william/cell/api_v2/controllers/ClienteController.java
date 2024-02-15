package com.william.cell.api_v2.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.cell.api_v2.controllers.interfaces.BaseController;
import com.william.cell.api_v2.models.DTO.ClienteDTO;
import com.william.cell.api_v2.models.entities.Cliente;

@RestController
@RequestMapping("/api/v2/cliente")
public class ClienteController extends BaseController<Cliente, ClienteDTO, String> {

}
