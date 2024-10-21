package com.felipe.category.infrastructure.genre.persistence;

import org.hibernate.query.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface GenreRepository extends JpaRepository<GenreJpaEntity, String> {

    Page findAll(Specification<GenreJpaEntity> whereClause, Pageable page);

    @Query(value = "select g.id from Genre g where g.id in :ids")
    List<String> existsByIds(@Param("ids") List<String> ids);
}
