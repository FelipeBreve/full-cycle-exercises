package com.felipe.category.application.category.retrieve.get;

import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.category.CategoryID;
import com.felipe.category.domain.exceptions.DomainException;
import com.felipe.category.domain.exceptions.NotFoundException;
import com.felipe.category.domain.validation.Error;

import java.util.Objects;
import java.util.function.Supplier;

import static io.vavr.API.Try;

public class DefaultGetCategoryByIdUseCase extends GetCategoryByIdUseCase {

    private final CategoryGateway categoryGateway;

    public DefaultGetCategoryByIdUseCase(final CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    @Override
    public CategoryOutput execute(String anIn) {
        final var anCategoryId = CategoryID.from(anIn);
        return this.categoryGateway.findById(anCategoryId)
                .map(CategoryOutput::from)
                .orElseThrow(notFound(anCategoryId));
    }

    private Supplier<NotFoundException> notFound(final CategoryID anId) {
        return () -> NotFoundException.with(Category.class, anId);
    }
}