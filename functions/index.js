const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'https://ec.europa.eu/taxation_customs/vies/services/checkVatService'
    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest((request, response) => {
    corsHandler(request, response, () => {
      corsServer.emit('request', request, response);
    })
});
