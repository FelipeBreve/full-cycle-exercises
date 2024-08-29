package com.felipe.category.domain.category;

public record CategorySearchQuery(
        int page,
        int perPage,
        String terms,
        String sort,
        String direction
) {
}
