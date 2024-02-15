package com.william.cell.api_v2.converters.factory;

import java.util.HashMap;
import java.util.Map;

import com.william.cell.api_v2.converters.ClienteConverter;
import com.william.cell.api_v2.converters.DetalleVentaConverter;
import com.william.cell.api_v2.converters.EntityConverter;
import com.william.cell.api_v2.converters.ProductoConverter;

public class FactoryRegistry {
    
    public static final Map<EntityConverterType, EntityConverter<?, ?>> factoryMap = new HashMap<>();

    static {
        factoryMap.put(EntityConverterType.CLIENTE, new ClienteConverter());
        factoryMap.put(EntityConverterType.PRODUCTO, new ProductoConverter());
        factoryMap.put(EntityConverterType.DETALLE_VENTA, new DetalleVentaConverter());
    }
}
