package edu.crypto.api.common.annotation;

import edu.crypto.api.common.validation.EachValidEnumValueValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EachValidEnumValueValidator.class)
@Target({ ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.TYPE_USE })
@Retention(RetentionPolicy.RUNTIME)
public @interface EachValidEnumValue {
    String message() default "Invalid value";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    Class<? extends Enum<?>> enumClass();
}
