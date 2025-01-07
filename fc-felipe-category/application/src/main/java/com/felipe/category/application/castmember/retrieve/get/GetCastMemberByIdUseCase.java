package com.felipe.category.application.castmember.retrieve.get;

import com.felipe.category.application.UseCase;

public sealed abstract class GetCastMemberByIdUseCase
        extends UseCase<String, CastMemberOutput>
        permits DefaultGetCastMemberByIdUseCase {
}
