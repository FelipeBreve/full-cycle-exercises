package com.felipe.category.application.category.delete;

import com.felipe.category.application.UnitUseCase;
import com.felipe.category.application.UseCase;
import com.felipe.category.application.category.create.CreateCategoryCommand;
import com.felipe.category.application.category.create.CreateCategoryOutput;
import com.felipe.category.domain.validation.handler.Notification;
import io.vavr.control.Either;

public abstract class DeleteCategoryUseCase
        extends UnitUseCase<String>
{
}
