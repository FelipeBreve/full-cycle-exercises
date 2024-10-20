package com.felipe.category.domain.validation;

import java.util.List;

// Interface Fluente: (Possibilidade de encadear metodos na mesma classe.)
public interface ValidationHandler {

    ValidationHandler append(Error anError);

    ValidationHandler append(ValidationHandler anHandler);

    <T> T validate(Validation<T> aValidation);

    default boolean hasError() {
        return getErrors() != null && !getErrors().isEmpty();
    }

    default Error firstError() {
        if (getErrors() != null && !getErrors().isEmpty()) {
            return getErrors().get(0);
        } else {
            return null;
        }
    }

    List<Error> getErrors();

    interface Validation<T> {
        T validate();
    }

}
