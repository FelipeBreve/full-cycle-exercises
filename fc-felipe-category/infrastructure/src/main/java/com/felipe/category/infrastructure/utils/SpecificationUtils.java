package com.felipe.category.infrastructure.utils;

import org.springframework.data.jpa.domain.Specification;

public final class SpecificationUtils {

    private SpecificationUtils() {}

    public static <T> Specification<T> like(final String prop, final String term) {
        return (root, query, criteriaBuilder)
                -> criteriaBuilder.like(criteriaBuilder.upper(root.get(prop)), SqlUtils.like(term.toUpperCase()));
    }

}
