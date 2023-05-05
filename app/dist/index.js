"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Ntfy_1 = __importDefault(require("./modules/Ntfy"));
const app = (0, express_1.default)()
    .use(express_1.default.json())
    .use(express_1.default.urlencoded({ extended: true }))
    .use(express_1.default.static('public'));
app.listen(3000, () => {
    console.log('Server listening on port 3000...');
    new Ntfy_1.default.Ntfy({
        host: process.env.NTFY_URL,
        credentials: {
            accessToken: process.env.NTFY_ACCESS_TOKEN,
        },
    })
        .notify({
        notification: {
            title: 'Server Status',
            message: 'Server started and listening on port 3000.',
        },
        recipient: {
            topic: 'tomtom',
        },
    })
        .then(() => {
        console.log('Notification sent to user.');
    })
        .catch((err) => {
        console.error(err);
    });
});
app.post('/callback', (req, res) => {
    console.log(req);
});
