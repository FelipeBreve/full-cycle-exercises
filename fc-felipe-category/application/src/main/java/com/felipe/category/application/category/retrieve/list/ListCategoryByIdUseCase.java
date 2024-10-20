package com.felipe.category.application.category.retrieve.list;

import com.felipe.category.application.UseCase;
import com.felipe.category.domain.pagination.SearchQuery;
import com.felipe.category.domain.pagination.Pagination;

public abstract class ListCategoryByIdUseCase
        extends UseCase<SearchQuery, Pagination<CategoryListOutput>>
{
}