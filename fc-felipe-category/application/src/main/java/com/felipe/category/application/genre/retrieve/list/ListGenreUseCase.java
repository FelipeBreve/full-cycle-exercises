package com.felipe.category.application.genre.retrieve.list;

import com.felipe.category.application.UseCase;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.domain.pagination.SearchQuery;

public abstract class ListGenreUseCase
        extends UseCase<SearchQuery, Pagination<GenreListOutput>> {
}
