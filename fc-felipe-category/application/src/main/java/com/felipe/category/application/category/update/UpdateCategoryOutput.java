package com.felipe.category.application.category.update;

import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.category.CategoryID;

public record UpdateCategoryOutput(
        String id
) {
    public static UpdateCategoryOutput from(final Category aCategory) {
        return new UpdateCategoryOutput(aCategory.getId().getValue());
    }

    public static UpdateCategoryOutput from(final String anId) {
        return new UpdateCategoryOutput(anId);
    }
}
