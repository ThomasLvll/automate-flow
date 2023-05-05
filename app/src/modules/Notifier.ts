namespace Notifier {
    export interface NotificationViewAction {
        action: 'view';
        label: string;
        url: string;
        clear?: boolean;
    }

    export interface NotificationBroadcastAction {
        action: 'broadcast';
        label: string;
        intent?: string;
        extras?: { [key: string]: string };
        clear?: boolean;
    }

    export interface NotificationHttpAction {
        action: 'http';
        label: string;
        url: string;
        method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS' | 'TRACE' | 'CONNECT';
        headers?: { [key: string]: string };
        body?: string;
        clear?: boolean;
    }

    export type NotificationAction =
        NotificationViewAction |
        NotificationBroadcastAction |
        NotificationHttpAction;

    export enum NotificationPriority {
        Min = 1,
        Low = 2,
        Default = 3,
        High = 4,
        Max = 5
    }

    export interface NotificationAttachment {
        url: string;
        filename: string;
    }

    export interface Notification {
        message: string;
        title?: string;
        priority?: NotificationPriority;
        clickUrl?: string;
        actions?: NotificationAction[];
        attachment?: NotificationAttachment;
    }

    export type NotificationRecipient = any;

    export interface NotifyOptions {
        notification: Notification;
        recipient?: NotificationRecipient;
    }

    export interface Notifier {
        notify: (options: NotifyOptions) => Promise<void>;
    }
}

export default Notifier;
