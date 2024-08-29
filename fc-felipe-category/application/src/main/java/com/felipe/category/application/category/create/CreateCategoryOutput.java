package com.felipe.category.application.category.create;

import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.category.CategoryID;

public record CreateCategoryOutput(
        CategoryID id
) {
    public static CreateCategoryOutput from(final Category aCategory) {
        return new CreateCategoryOutput(aCategory.getId());
    }
}
