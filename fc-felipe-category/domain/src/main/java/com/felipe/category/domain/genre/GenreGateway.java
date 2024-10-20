package com.felipe.category.domain.genre;

import com.felipe.category.domain.category.CategoryID;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.domain.pagination.SearchQuery;

import java.util.Iterator;
import java.util.Optional;

public interface GenreGateway {
    Genre create(Genre genre);

    void deleteById(GenreID anId);

    Optional<Genre> findById(GenreID anId);

    Genre update(Genre aGenre);

    Pagination<Genre> findAll(SearchQuery aQuery);
}
