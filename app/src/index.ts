import express from 'express';
import Notifier from './modules/Notifier';
import Ntfy from './modules/Ntfy';



const app =
    express()
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(express.static('public'));

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
    new Ntfy.Ntfy({
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
