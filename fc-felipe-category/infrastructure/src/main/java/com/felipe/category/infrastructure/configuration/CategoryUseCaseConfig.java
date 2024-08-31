package com.felipe.category.infrastructure.configuration;

import com.felipe.category.application.category.create.CreateCategoryUseCase;
import com.felipe.category.application.category.create.DefaultCreateCategoryUseCase;
import com.felipe.category.application.category.delete.DefaultDeleteCategoryUseCase;
import com.felipe.category.application.category.delete.DeleteCategoryUseCase;
import com.felipe.category.application.category.retrieve.get.DefaultGetCategoryByIdUseCase;
import com.felipe.category.application.category.retrieve.get.GetCategoryByIdUseCase;
import com.felipe.category.application.category.retrieve.list.DefaultListCategoryByIdUseCase;
import com.felipe.category.application.category.retrieve.list.ListCategoryByIdUseCase;
import com.felipe.category.application.category.update.DefaultUpdateCategoryUseCase;
import com.felipe.category.application.category.update.UpdateCategoryUseCase;
import com.felipe.category.domain.category.CategoryGateway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoryUseCaseConfig {

    private final CategoryGateway categoryGateway;

    public CategoryUseCaseConfig(final CategoryGateway categoryGateway) {
        this.categoryGateway = categoryGateway;
    }

    @Bean
    public CreateCategoryUseCase createCategoryUseCase() {
        return new DefaultCreateCategoryUseCase(categoryGateway);
    }

    @Bean
    public UpdateCategoryUseCase updateCategoryUseCase() {
        return new DefaultUpdateCategoryUseCase(categoryGateway);
    }

    @Bean
    public GetCategoryByIdUseCase getCategoryByIdUseCase() {
        return new DefaultGetCategoryByIdUseCase(categoryGateway);
    }

    @Bean
    public ListCategoryByIdUseCase listCategoriesUseCase() {
        return new DefaultListCategoryByIdUseCase(categoryGateway);
    }

    @Bean
    public DeleteCategoryUseCase deleteCategoryUseCase() {
        return new DefaultDeleteCategoryUseCase(categoryGateway);
    }
}
