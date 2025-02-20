package com.felipe.category.infrastructure.configuration;

import com.felipe.category.infrastructure.configuration.properties.google.GoogleStorageProperties;
import com.felipe.category.infrastructure.configuration.properties.storage.StorageProperties;
import com.felipe.category.infrastructure.services.StorageService;
import com.felipe.category.infrastructure.services.impl.GCStorageService;
import com.felipe.category.infrastructure.services.local.InMemoryStorageService;
import com.google.cloud.storage.Storage;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
public class StorageConfig {

    @Bean
    @ConfigurationProperties(value = "storage.catalogo-videos")
    public StorageProperties storageProperties() {
        return new StorageProperties();
    }

    @Bean
    @Profile({"development", "test-integration", "test-e2e"})
    public StorageService localStorageAPI() {
        return new InMemoryStorageService();
    }

    @Bean
    @ConditionalOnMissingBean
    public StorageService gcStorageAPI(
            final GoogleStorageProperties props,
            final Storage storage
    ) {
        return new GCStorageService(props.getBucket(), storage);
    }
}
