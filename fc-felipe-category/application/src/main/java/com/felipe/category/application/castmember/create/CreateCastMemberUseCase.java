package com.felipe.category.application.castmember.create;

import com.felipe.category.application.UseCase;

// Sealed interface cria uma hierarquia de classes que podem ser instanciadas
// apenas por classes que estão no mesmo arquivo que a interface ou por classes
// que estão no mesmo módulo que a interface.
public sealed abstract class CreateCastMemberUseCase
        extends UseCase<CreateCastMemberCommand, CreateCastMemberOutput>
        permits DefaultCreateCastMemberUseCase {
}
