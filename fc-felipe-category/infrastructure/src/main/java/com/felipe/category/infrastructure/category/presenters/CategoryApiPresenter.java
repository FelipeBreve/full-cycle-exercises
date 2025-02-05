package com.felipe.category.infrastructure.category.presenters;

import com.felipe.category.application.category.retrieve.get.CategoryOutput;
import com.felipe.category.application.category.retrieve.list.CategoryListOutput;
import com.felipe.category.infrastructure.category.models.CategoryResponse;
import com.felipe.category.infrastructure.category.models.CategoryListResponse;

public interface CategoryApiPresenter {

//    Function<CategoryOutput, CategoryApiOutput> present = output -> new CategoryApiOutput(
//            output.id().getValue(),
//            output.name(),
//            output.description(),
//            output.isActive(),
//            output.createdAt(),
//            output.updatedAt(),
//            output.deletedAt()
//    );

    static CategoryResponse present(final CategoryOutput output) {
        return new CategoryResponse(
                output.id().getValue(),
                output.name(),
                output.description(),
                output.isActive(),
                output.createdAt(),
                output.updatedAt(),
                output.deletedAt()
        );
    }

    static CategoryListResponse present(final CategoryListOutput output) {
        return new CategoryListResponse(
                output.id().getValue(),
                output.name(),
                output.description(),
                output.isActive(),
                output.createdAt(),
                output.deletedAt()
        );
    }

}
