package edu.crypto.api.common.validation;

import edu.crypto.api.common.annotation.EachValidEnumValue;
import edu.crypto.api.common.exception.InvalidEnumValueException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;
import java.util.Set;
import java.util.stream.Collectors;

public class EachValidEnumValueValidator implements ConstraintValidator<EachValidEnumValue, Set<String>> {
    private Class<? extends Enum<?>> enumClass;

    @Override
    public void initialize(EachValidEnumValue constraintAnnotation) {
        this.enumClass = constraintAnnotation.enumClass();
    }

    @Override
    public boolean isValid(Set<String> values, ConstraintValidatorContext context) {
        if (values == null) {
            return true;
        }

        for (String value : values) {
            if (!isValidEnum(value)) {
                String validValues = getValidEnumValues();
                throw new InvalidEnumValueException("Invalid enum value: " + value + ". Valid values are: " + validValues);
            }
        }

        return true;
    }

    private boolean isValidEnum(String value) {
        if (value == null) {
            return false;
        }
        for (Enum<?> enumConstant : enumClass.getEnumConstants()) {
            if (enumConstant.name().equals(value)) {
                return true;
            }
        }
        return false;
    }

    private String getValidEnumValues() {
        return Arrays.stream(enumClass.getEnumConstants())
                .map(Enum::name)
                .collect(Collectors.joining(", "));
    }
}

