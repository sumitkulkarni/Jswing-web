package org.webswing.server.common.model.meta;

import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target(value = { ElementType.TYPE })
@Inherited
@SuppressWarnings("rawtypes")
public @interface ConfigType {
	Class<? extends MetadataGenerator> metadataGenerator() default MetadataGenerator.class;
}
