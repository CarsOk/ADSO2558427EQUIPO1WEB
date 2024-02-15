package com.william.cell.api_v2.converters.factory;

import com.william.cell.api_v2.converters.EntityConverter;

public final class EntityConverterFactory {
    
    public static EntityConverter<?, ?> factory(EntityConverterType entityConverterType) {
        return FactoryRegistry.factoryMap.get(entityConverterType);
    }
}
