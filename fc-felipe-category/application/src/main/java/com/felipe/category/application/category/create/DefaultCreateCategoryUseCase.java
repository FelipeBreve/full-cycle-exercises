package com.felipe.category.application.category.create;

import com.felipe.category.domain.category.Category;
import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.validation.handler.Notification;
import io.vavr.API;
import io.vavr.control.Either;

import java.util.Objects;

import static io.vavr.API.Try;

public class DefaultCreateCategoryUseCase extends CreateCategoryUseCase {

    private final CategoryGateway categoryGateway;

    public DefaultCreateCategoryUseCase(final CategoryGateway categoryGateway) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
    }

    @Override
    public Either<Notification, CreateCategoryOutput> execute(CreateCategoryCommand aCommand) {
        final var aName = aCommand.name();
        final var aDescription = aCommand.description();
        final var isActive = aCommand.isActive();

        final var notification = Notification.create();

        final var aCategory = Category.newCategory(aName, aDescription, isActive);
        aCategory.validate(notification);

        return notification.hasErrors() ? API.Left(notification) : create(aCategory);
    }

    //Either (Vem do conceito da programacao funcional)
    private Either<Notification, CreateCategoryOutput> create(Category aCategory) {
        // Uma maneira de usar o Either
//        return API.Try(
//                () -> this.categoryGateway.create(aCategory)
//        ).toEither()
//            .map(Notification::create)
//            .mapLeft(CreateCategoryOutput::from);

        return Try(() -> this.categoryGateway.create(aCategory))
                .toEither()
                .bimap(Notification::create, CreateCategoryOutput::from);
    }
}