package com.felipe.category.domain;

import com.felipe.category.domain.validation.ValidationHandler;

import javax.xml.validation.ValidatorHandler;
import java.util.Objects;

public abstract class Entity<ID extends Identifier>  {

    protected final ID id;

    public Entity(final ID id) {
        Objects.requireNonNull(id, "'id' should not null");
        this.id = id;
    }

    public abstract void validate(ValidationHandler validation);

    public ID getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Entity<?> entity = (Entity<?>) o;
        return Objects.equals(id, entity.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
