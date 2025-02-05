package com.felipe.category.domain.exceptions;

// TODO: Hoje todos as exception devido a literatura, deve seguir a ideia do Runtime(Unchecked) em vez de (ChecksExceptions)
// Isso devido a toda programacao funcional
public class NoStackTraceException extends RuntimeException {
    public NoStackTraceException(final String message) {
        this(message, null);
    }

    // TODO: Os dois parametros abaixo, sao importantes devido a pontos de busca de toda a stacktrace.(true, false)
    // boolean enableSuppression,
    // boolean writableStackTrace
    // Ela nao faz a JVM capturar de fato toda a stack de erro, a deixando mais robusta e performatica.
    public NoStackTraceException(final String message, final Throwable cause) {
        super(message, cause, true, false);
    }
}
