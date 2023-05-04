import express from 'express';


const app =
    express()
        .use(express.json())
        .use(express.urlencoded({ extended: true }))
        .use(express.static('public'));

app.listen(3000, () => {
    console.log('Server listening on port 3000...');
});

app.post('/callback', (req, res) => {
    console.log(req);
});
