type NotificationLike = {
    title?: string;
    body?: string;
    data?: {
        title_key?: string;
        body_key?: string;
        translation_params?: Record<string, string | number>;
    };
};

type Translate = (
    key: string,
    replacements?: Record<string, string | number>,
) => string;

function replaceLaravelPlaceholders(
    text: string,
    replacements?: Record<string, string | number>,
): string {
    if (!replacements) {
        return text;
    }

    return Object.entries(replacements).reduce(
        (resolvedText, [key, value]) =>
            resolvedText.replaceAll(`:${key}`, String(value)),
        text,
    );
}

export function resolveNotificationTitle(
    notification: NotificationLike,
    translate: Translate,
): string {
    if (notification.data?.title_key) {
        return replaceLaravelPlaceholders(
            translate(
                notification.data.title_key,
                notification.data.translation_params,
            ),
            notification.data.translation_params,
        );
    }

    return notification.title ?? '';
}

export function resolveNotificationBody(
    notification: NotificationLike,
    translate: Translate,
): string {
    if (notification.data?.body_key) {
        return replaceLaravelPlaceholders(
            translate(
                notification.data.body_key,
                notification.data.translation_params,
            ),
            notification.data.translation_params,
        );
    }

    return notification.body ?? '';
}
