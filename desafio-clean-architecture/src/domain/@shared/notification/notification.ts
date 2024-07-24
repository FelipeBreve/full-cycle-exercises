export type NotificationErrorProps = {
    message: string;
    context: string;
}

export default class Notification {
    private errors: NotificationErrorProps[] = [];

    addError(error: NotificationErrorProps) {
        this.errors.push(error);
    }

    messages(context?: string): string {
        const messages = this.errors
            .filter(error => error.context === context || !context)
            .map(error => `${error.context}: ${error.message},`)
            .join("");

        return messages;
    }

    hasErrors() {
        return this.errors.length > 0;
    }

    get getErrors(): NotificationErrorProps[] {
        return this.errors;
    }
}