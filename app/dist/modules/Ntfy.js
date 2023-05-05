"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ntfy;
(function (Ntfy_1) {
    class Ntfy {
        host;
        defaultRecipient;
        headers;
        constructor(options) {
            this.host = options.host;
            this.defaultRecipient = options.defaultRecipient;
            this.headers = {
                'Content-Type': 'application/json; charset=utf-8'
            };
            if (options.credentials) {
                if ('username' in options.credentials && 'password' in options.credentials) {
                    this.headers['Authorization'] = `Basic ${Buffer.from(`${options.credentials.username}:${options.credentials.password}`).toString('base64')}`;
                }
                else if ('accessToken' in options.credentials) {
                    this.headers['Authorization'] = `Bearer ${options.credentials.accessToken}`;
                }
            }
        }
        async notify(options) {
            if (!(options.recipient || this.defaultRecipient)) {
                throw new Error('No recipient specified. Specify a default recipient in the notifier constructor or in the arguments when calling this method.');
            }
            const response = await fetch(this.host, {
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
            });
            if (response.status !== 200) {
                throw new Error(`Failed to send notification: server responded with status code ${response.status} (${response.statusText}).\n${await response.text()}`);
            }
        }
    }
    Ntfy_1.Ntfy = Ntfy;
})(Ntfy || (Ntfy = {}));
exports.default = Ntfy;
