import Notifier from './Notifier';



namespace Ntfy {
    export interface UsernamePasswordAuth {
        username: string;
        password: string;
    }

    export interface AccessTokenAuth {
        accessToken: string;
    }

    export interface Recipient {
        topic: string;
    }

    export interface NtfyOptions {
        host: string;
        defaultRecipient?: Recipient;
        credentials?: UsernamePasswordAuth | AccessTokenAuth;
    }

    export interface NotifyOptions {
        notification: Notifier.Notification;
        recipient?: Recipient;
    }

    export class Ntfy implements Notifier.Notifier {
        private readonly host: string;
        private readonly defaultRecipient?: Recipient;
        private readonly headers: { [key: string]: string };

        constructor(options: NtfyOptions) {
            this.host = options.host;
            this.defaultRecipient = options.defaultRecipient;
            this.headers = {
                'Content-Type': 'application/json; charset=utf-8'
            };
            if (options.credentials) {
                if ('username' in options.credentials && 'password' in options.credentials) {
                    this.headers['Authorization'] = `Basic ${Buffer.from(`${options.credentials.username}:${options.credentials.password}`).toString('base64')}`;
                } else if ('accessToken' in options.credentials) {
                    this.headers['Authorization'] = `Bearer ${options.credentials.accessToken}`;
                }
            }
        }

        public async notify(options: NotifyOptions): Promise<void> {
            if (! (options.recipient || this.defaultRecipient)) {
                throw new Error('No recipient specified. Specify a default recipient in the notifier constructor or in the arguments when calling this method.');
            }

            const response = await fetch(
                this.host,
                {
                    method: 'POST',
                    headers: this.headers,
                    body: JSON.stringify({
                        topic: options.recipient?.topic || this.defaultRecipient?.topic,
                        message: options.notification.message,
                        title: options.notification.title,
                        priority: options.notification.priority,
                        click: options.notification.clickUrl,
                        actions: options.notification.actions,
                        attach: options.notification.attachment?.url,
                        filename: options.notification.attachment?.filename,
                    }),
                }
            );
            if (response.status !== 200) {
                throw new Error(`Failed to send notification: server responded with status code ${response.status} (${response.statusText}).\n${await response.text()}`);
            }
        }
    }
}

export default Ntfy;
