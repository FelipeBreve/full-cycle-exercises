package com.felipe.category.infrastructure.castmember.models;

import com.felipe.category.domain.castmember.CastMemberType;

public record CreateCastMemberRequest(String name, CastMemberType type) {
}
