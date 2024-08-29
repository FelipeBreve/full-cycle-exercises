package com.felipe.category.application.category.retrieve.list;

import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.category.CategorySearchQuery;
import com.felipe.category.domain.pagination.Pagination;

import java.util.Objects;

public class DefaultListCategoryByIdUseCase extends ListCategoryByIdUseCase {

    private final CategoryGateway categoryGateway;

    public DefaultListCategoryByIdUseCase(final CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    @Override
    public Pagination<CategoryListOutput> execute(CategorySearchQuery aQuery) {
        return this.categoryGateway.findAll(aQuery).map(CategoryListOutput::from);
    }
}