package com.felipe.category.domain.genre;

import com.felipe.category.domain.Identifier;
import com.felipe.category.domain.category.CategoryID;
import com.felipe.category.domain.utils.IdUtils;

import java.util.Objects;
import java.util.UUID;

public class GenreID extends Identifier {
    private final String value;

    private GenreID(final String value) {
        this.value = value;
    }

    public static GenreID unique() {
        return GenreID.from(IdUtils.uuid());
    }

    public static GenreID from(final String anId) {
        return new GenreID(anId);
    }

    @Override
    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        final GenreID that = (GenreID) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(value);
    }
}
