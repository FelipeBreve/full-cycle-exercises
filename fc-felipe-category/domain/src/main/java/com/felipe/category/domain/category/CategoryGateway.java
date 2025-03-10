package com.felipe.category.domain.category;

import com.felipe.category.domain.pagination.SearchQuery;
import com.felipe.category.domain.pagination.Pagination;

import java.util.Iterator;
import java.util.List;
import java.util.Optional;

public interface CategoryGateway {

    Category create(Category aCategory);

    void deleteById(CategoryID anID);

    Optional<Category> findById(CategoryID anID);

    Category update(Category aCategory);

    Pagination<Category> findAll(SearchQuery aQuery);

    List<CategoryID> existsByIds(Iterable<CategoryID> ids);
}
