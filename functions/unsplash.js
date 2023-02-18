const { createApi } = require('unsplash-js');
const nodeFetch = require('node-fetch');

exports.handler = async (event, context, callback) => {
    console.log('start', process.env.UNSPLASH_ACCESS_KEY);
    
    const pass = (body) => {
        callback(null, { statusCode: body.statusCode || body.status || 200, body: JSON.stringify(body) });
    };

    try {
        console.log(event, 'event');
        const unsplash = createApi({
            accessKey: process.env.UNSPLASH_ACCESS_KEY,
            fetch: nodeFetch,
        });

        console.log(event.queryStringParameters);

        const data = await unsplash.search.getPhotos({
            query: event.queryStringParameters.search,
            page: 1,
            per_page: 20,
        }).catch(err => {throw err});

        console.log(data);
        await pass(data);

    } catch (err) {
        console.log(err);
        let error = {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({ error: err.message }),
        };
        await pass(error);
    }
};
