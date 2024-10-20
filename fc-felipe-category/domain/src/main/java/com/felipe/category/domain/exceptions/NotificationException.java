package com.felipe.category.domain.exceptions;

import com.felipe.category.domain.validation.Error;
import com.felipe.category.domain.validation.handler.Notification;

import java.util.List;

public class NotificationException extends DomainException {
    public NotificationException(String aMessage, Notification notification) {
        super(aMessage, notification.getErrors());
    }
}
