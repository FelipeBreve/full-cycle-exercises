package com.felipe.category.infrastructure.category;

import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.category.CategoryID;
import com.felipe.category.domain.category.CategorySearchQuery;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.infrastructure.category.persistence.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryMySQLGateway implements CategoryGateway {

    private final CategoryRepository repository;

    public CategoryMySQLGateway(final CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Category create(Category aCategory) {
        return null;
    }

    @Override
    public void deleteById(CategoryID anID) {

    }

    @Override
    public Optional<Category> findById(CategoryID anID) {
        return Optional.empty();
    }

    @Override
    public Category update(Category aCategory) {
        return null;
    }

    @Override
    public Pagination<Category> findAll(CategorySearchQuery aQuery) {
        return null;
    }
}
