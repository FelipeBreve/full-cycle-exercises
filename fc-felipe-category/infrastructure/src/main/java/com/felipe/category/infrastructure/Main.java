package com.felipe.category.infrastructure;

import com.felipe.category.domain.category.Category;
import com.felipe.category.infrastructure.category.persistence.CategoryJpaEntity;
import com.felipe.category.infrastructure.category.persistence.CategoryRepository;
import com.felipe.category.infrastructure.configuration.WebServerConfig;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.AbstractEnvironment;

import java.util.List;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
        System.setProperty(AbstractEnvironment.DEFAULT_PROFILES_PROPERTY_NAME, "development");
//        System.setProperty(AbstractEnvironment.DEFAULT_PROFILES_PROPERTY_NAME, "production");
        SpringApplication.run(WebServerConfig.class, args);
    }

//    @Bean
//    public ApplicationRunner runner(CategoryRepository repository) {
//        return args -> {
//            List<CategoryJpaEntity> all = repository.findAll();
//
//            Category filme = Category.newCategory("Filmes", null, true);
//
//            repository.saveAndFlush(CategoryJpaEntity.from(filme));
//
//            repository.deleteAll();
//        };
//    }

}