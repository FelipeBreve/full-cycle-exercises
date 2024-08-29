package com.felipe.category.application.category.create;

import com.felipe.category.application.UseCase;
import com.felipe.category.domain.validation.handler.Notification;
import io.vavr.control.Either;

public abstract class CreateCategoryUseCase
        extends UseCase<CreateCategoryCommand, Either<Notification, CreateCategoryOutput>>
{
}
