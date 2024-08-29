package com.felipe.category.infrastructure.category;

import com.felipe.category.infrastructure.MySQLGatewayTest;
import com.felipe.category.infrastructure.category.persistence.CategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;


@MySQLGatewayTest
public class CategoryMySQLGatewayTest {

    @Autowired
    private CategoryMySQLGateway categoryMySQLGateway;

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    public void example() {
        Assertions.assertNotNull(categoryMySQLGateway);
        Assertions.assertNotNull(categoryRepository);
    }

//    static class CleanUpExtension implements BeforeEachCallback {
//
//        @Override
//        public void beforeEach(ExtensionContext context) throws Exception {
//            final var repositories = SpringExtension
//                    .getApplicationContext(context)
//                    .getBeansOfType(CrudRepository.class)
//                    .values();
//            cleanUp(repositories);
//        }
//
//        private void cleanUp(final Collection<CrudRepository> repositories) {
//            repositories.forEach(CrudRepository::deleteAll);
//        }
//    }
}
