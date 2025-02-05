package com.felipe.category.application.castmember.retrieve.list;

import com.felipe.category.application.UseCase;
import com.felipe.category.domain.pagination.Pagination;
import com.felipe.category.domain.pagination.SearchQuery;

public sealed abstract class ListCastMembersUseCase
        extends UseCase<SearchQuery, Pagination<CastMemberListOutput>>
        permits DefaultListCastMembersUseCase {
}