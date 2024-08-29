package com.felipe.category.application.category.update;

import com.felipe.category.application.category.create.CreateCategoryOutput;
import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.category.CategoryID;
import com.felipe.category.domain.exceptions.DomainException;
import com.felipe.category.domain.validation.Error;
import com.felipe.category.domain.validation.handler.Notification;
import io.vavr.API;
import io.vavr.control.Either;

import java.util.Objects;
import java.util.function.Supplier;

import static io.vavr.API.Try;

public class DefaultUpdateCategoryUseCase extends UpdateCategoryUseCase {

    private final CategoryGateway categoryGateway;

    public DefaultUpdateCategoryUseCase(final CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    @Override
    public Either<Notification, UpdateCategoryOutput> execute(final UpdateCategoryCommand aCommand) {
        final var anId = CategoryID.from(aCommand.id());
        final var aName = aCommand.name();
        final var aDescription = aCommand.description();
        final var isActive = aCommand.isActive();

        final var aCategory = this.categoryGateway.findById(anId).orElseThrow(notFound(anId));
        final var notification = Notification.create();
        aCategory.update(aName, aDescription, isActive).validate(notification);

        return notification.hasErrors() ? API.Left(notification) : update(aCategory);
    }

    private Supplier<DomainException> notFound(final CategoryID anId) {
        return () -> DomainException.with(new Error("Category with ID %s was not found".formatted(anId.getValue())));
    }

    private Either<Notification, UpdateCategoryOutput> update(Category aCategory) {
        return Try(() -> this.categoryGateway.update(aCategory))
                .toEither()
                .bimap(Notification::create, UpdateCategoryOutput::from);
    }
}