package com.felipe.category.domain.genre;

import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.validation.Error;
import com.felipe.category.domain.validation.ValidationHandler;
import com.felipe.category.domain.validation.Validator;

public class GenreValidator extends Validator {

    public static final int NAME_MAX_LENGTH = 255;
    public static final int NAME_MIN_LENGTH = 1;
    private final Genre genre;
    public GenreValidator(final Genre aGenre, ValidationHandler aHandler) {
        super(aHandler);
        this.genre = aGenre;
    }

    @Override
    public void validate() {
        this.checkNameConstraints();
    }

    private void checkNameConstraints() {
        final var name = this.genre.getName();
        if (name == null) {
            this.validationHandler().append(new Error("'name' should not be null"));
            return;
        }

        if (name.isBlank()) {
            this.validationHandler().append(new Error("'name' should not be empty"));
            return;
        }

        final int length = name.trim().length();
        if (length > NAME_MAX_LENGTH || length < NAME_MIN_LENGTH) {
            this.validationHandler().append(new Error("'name' must be between 1 and 255 characters"));
        }
    }
}
