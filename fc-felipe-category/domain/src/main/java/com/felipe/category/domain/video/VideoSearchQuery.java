package com.felipe.category.domain.video;

import com.felipe.category.domain.castmember.CastMemberID;
import com.felipe.category.domain.category.CategoryID;
import com.felipe.category.domain.genre.GenreID;

import java.util.Set;

public record VideoSearchQuery(
        int page,
        int perPage,
        String terms,
        String sort,
        String direction,
        Set<CastMemberID> castMembers,
        Set<CategoryID> categories,
        Set<GenreID> genres
) {
}
