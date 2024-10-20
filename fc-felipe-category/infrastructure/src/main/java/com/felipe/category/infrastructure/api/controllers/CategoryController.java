package com.felipe.category.infrastructure.api.controllers;

import com.felipe.category.application.category.create.CreateCategoryCommand;
import com.felipe.category.application.category.create.CreateCategoryOutput;
import com.felipe.category.application.category.create.CreateCategoryUseCase;
import com.felipe.category.application.category.delete.DeleteCategoryUseCase;
import com.felipe.category.application.category.retrieve.get.GetCategoryByIdUseCase;
import com.felipe.category.application.category.retrieve.list.ListCategoryByIdUseCase;
import com.felipe.category.application.category.update.UpdateCategoryCommand;
import com.felipe.category.application.category.update.UpdateCategoryOutput;
import com.felipe.category.application.category.update.UpdateCategoryUseCase;
import com.felipe.category.domain.pagination.SearchQuery;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.domain.validation.handler.Notification;
import com.felipe.category.infrastructure.api.CategoryAPI;
import com.felipe.category.infrastructure.category.models.CategoryListResponse;
import com.felipe.category.infrastructure.category.models.CategoryResponse;
import com.felipe.category.infrastructure.category.models.CreateCategoryRequest;
import com.felipe.category.infrastructure.category.models.UpdateCategoryRequest;
import com.felipe.category.infrastructure.category.presenters.CategoryApiPresenter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.util.Objects;
import java.util.function.Function;

@RestController
public class CategoryController implements CategoryAPI {

    private final CreateCategoryUseCase createCategoryUseCase;
    private final GetCategoryByIdUseCase getCategoryByIdUseCase;
    private final UpdateCategoryUseCase updateCategoryUseCase;
    private final DeleteCategoryUseCase deleteCategoryUseCase;
    private final ListCategoryByIdUseCase listCategoryByIdUseCase;

    public CategoryController(final CreateCategoryUseCase createCategoryUseCase,
                              final GetCategoryByIdUseCase getCategoryByIdUseCase,
                              final UpdateCategoryUseCase updateCategoryUseCase,
                              final DeleteCategoryUseCase deleteCategoryUseCase,
                              final ListCategoryByIdUseCase listCategoryByIdUseCase
                              ) {
        this.createCategoryUseCase = Objects.requireNonNull(createCategoryUseCase);
        this.getCategoryByIdUseCase = Objects.requireNonNull(getCategoryByIdUseCase);
        this.updateCategoryUseCase = Objects.requireNonNull(updateCategoryUseCase);
        this.deleteCategoryUseCase = Objects.requireNonNull(deleteCategoryUseCase);
        this.listCategoryByIdUseCase = Objects.requireNonNull(listCategoryByIdUseCase);
    }

    @Override
    public ResponseEntity<?> createCategory(final CreateCategoryRequest input) {
        final var aCommand = CreateCategoryCommand.with(
                input.name(),
                input.description(),
                input.active() != null ? input.active() : true
        );

//        final Function<Notification, ResponseEntity<?>> onError = notification ->
//                ResponseEntity.unprocessableEntity().body(notification);

        final Function<Notification, ResponseEntity<?>> onError =
                ResponseEntity.unprocessableEntity()::body;

        final Function<CreateCategoryOutput, ResponseEntity<?>> onSuccess = output ->
                ResponseEntity.created(URI.create("/categories/" + output.id())).body(output);

        return this.createCategoryUseCase.execute(aCommand)
                .fold(onError, onSuccess);
    }

    @Override
    public Pagination<CategoryListResponse> listCategories(
            final String search,
            final int page,
            final int perPage,
            final String sort,
            final String direction) {
        return this.listCategoryByIdUseCase
                .execute(new SearchQuery(page, perPage, search, sort, direction))
                .map(CategoryApiPresenter::present);
    }

    @Override
    public CategoryResponse getById(String id) {
        return CategoryApiPresenter.present(this.getCategoryByIdUseCase.execute(id));
    }

    @Override
    public ResponseEntity<?> updateById(final String id, final UpdateCategoryRequest input) {
        final var aCommand = UpdateCategoryCommand.with(
                id,
                input.name(),
                input.description(),
                input.active() != null ? input.active() : true
        );

        final Function<Notification, ResponseEntity<?>> onError =
                ResponseEntity.unprocessableEntity()::body;

        final Function<UpdateCategoryOutput, ResponseEntity<?>> onSuccess = ResponseEntity::ok;

        return this.updateCategoryUseCase.execute(aCommand)
                .fold(onError, onSuccess);
    }

    @Override
    public void deleteById(final String anId) {
        this.deleteCategoryUseCase.execute(anId);
    }
}
