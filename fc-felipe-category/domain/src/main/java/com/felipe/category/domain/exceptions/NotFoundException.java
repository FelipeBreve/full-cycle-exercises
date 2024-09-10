package com.felipe.category.domain.exceptions;

import com.felipe.category.domain.AggregateRoot;
import com.felipe.category.domain.Identifier;
import com.felipe.category.domain.validation.Error;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class NotFoundException extends DomainException {

    private NotFoundException(final String aMessage, List<Error> anErrors) {
        super(aMessage, anErrors);
    }

    public static NotFoundException with(
            final Class<? extends AggregateRoot<?>> anAggreagateRoot,
            final Identifier id
    ) {
        final var anError = "%s with ID %s was not found".formatted(
                anAggreagateRoot.getSimpleName(),
                id.getValue());
        return new NotFoundException(anError, Collections.emptyList());
    }
}
