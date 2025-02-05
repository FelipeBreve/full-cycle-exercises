package com.felipe.category.infrastructure.configuration.usecases;

import com.felipe.category.application.genre.create.CreateGenreUseCase;
import com.felipe.category.application.genre.create.DefaultCreateGenreUseCase;
import com.felipe.category.application.genre.delete.DefaultDeleteGenreUseCase;
import com.felipe.category.application.genre.delete.DeleteGenreUseCase;
import com.felipe.category.application.genre.retrieve.get.DefaultGetGenreByIdUseCase;
import com.felipe.category.application.genre.retrieve.get.GetGenreByIdUseCase;
import com.felipe.category.application.genre.retrieve.list.DefaultListGenreUseCase;
import com.felipe.category.application.genre.retrieve.list.ListGenreUseCase;
import com.felipe.category.application.genre.update.DefaultUpdateGenreUseCase;
import com.felipe.category.application.genre.update.UpdateGenreUseCase;
import com.felipe.category.domain.category.CategoryGateway;
import com.felipe.category.domain.genre.GenreGateway;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Objects;

@Configuration
public class GenreUseCaseConfig {

    private final CategoryGateway categoryGateway;
    private final GenreGateway genreGateway;

    public GenreUseCaseConfig(
            final CategoryGateway categoryGateway,
            final GenreGateway genreGateway
    ) {
        this.categoryGateway = Objects.requireNonNull(categoryGateway);
        this.genreGateway = Objects.requireNonNull(genreGateway);
    }

    @Bean
    public CreateGenreUseCase createGenreUseCase() {
        return new DefaultCreateGenreUseCase(categoryGateway, genreGateway);
    }

    @Bean
    public DeleteGenreUseCase deleteGenreUseCase() {
        return new DefaultDeleteGenreUseCase(genreGateway);
    }

    @Bean
    public GetGenreByIdUseCase getGenreByIdUseCase() {
        return new DefaultGetGenreByIdUseCase(genreGateway);
    }

    @Bean
    public ListGenreUseCase listGenreUseCase() {
        return new DefaultListGenreUseCase(genreGateway);
    }

    @Bean
    public UpdateGenreUseCase updateGenreUseCase() {
        return new DefaultUpdateGenreUseCase(categoryGateway, genreGateway);
    }
}