package edu.crypto.api.common.validation;

import edu.crypto.api.common.annotation.ValidEnumValue;
import edu.crypto.api.common.exception.InvalidEnumValueException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.stream.Collectors;

public class EnumValidator implements ConstraintValidator<ValidEnumValue, CharSequence> {
    private Class<? extends Enum<?>> enumClass;

    @Override
    public void initialize(ValidEnumValue constraintAnnotation) {
        this.enumClass = constraintAnnotation.enumClass();
    }

    @Override
    public boolean isValid(CharSequence value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }

        boolean isValid = Arrays.stream(enumClass.getEnumConstants())
                .anyMatch(e -> e.name().equals(value.toString()));

        if (!isValid) {
            String availableValues = Arrays.stream(enumClass.getEnumConstants())
                    .map(Enum::name)
                    .collect(Collectors.joining(", "));
            throw new InvalidEnumValueException("Invalid value for enum " + enumClass.getSimpleName() + ": " + value + ". Available values are: " + availableValues);
        }

        return true;
    }
}
