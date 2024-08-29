package com.felipe.category.application.category.update;

public record UpdateCategoryCommand(
        String id,
        String name,
        String description,
        boolean isActive
) {

    public static UpdateCategoryCommand with(
            String id,
            String aName,
            String aDescription,
            boolean isActive
    ) {
        return new UpdateCategoryCommand(id, aName, aDescription, isActive);
    }

}
