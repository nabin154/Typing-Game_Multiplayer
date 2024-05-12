const cron = require('cron');
const https = require('https');

const backendUrl = "https://typing-game-8c44.onrender.com";

const job = new cron.CronJob('*/1 * * * *', function () {

    console.log(`Restarting Server`);


    https.get(backendUrl, (res) => {
        if (res.statusCode === 200) {
            console.log("server restarted");
        }
        else {
            console.error(`failed to restart server with status code : ${res.statusCode}`);
        }
    })
        .on('error', (err) => {
            console.error('Error during restart:', err.message);
        });
});

module.exports = { job: job };