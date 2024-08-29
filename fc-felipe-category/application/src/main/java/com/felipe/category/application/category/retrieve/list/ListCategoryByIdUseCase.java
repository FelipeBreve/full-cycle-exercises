package com.felipe.category.application.category.retrieve.list;

import com.felipe.category.application.UseCase;
import com.felipe.category.application.category.retrieve.get.CategoryOutput;
import com.felipe.category.domain.category.CategorySearchQuery;
import com.felipe.category.domain.pagination.Pagination;

public abstract class ListCategoryByIdUseCase
        extends UseCase<CategorySearchQuery, Pagination<CategoryListOutput>>
{
}