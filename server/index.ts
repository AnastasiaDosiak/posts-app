import * as express from 'express';
import postsApi from './api/posts';

const app = express();

// Use the postsApi for the '/api/posts' route
app.use('/api/posts', postsApi);

// Set up a basic route for the root URL to show it's working
app.get('/', (req: any, res: any) => {
    res.send('API server is running.');
});

export default {
    path: '/server',
    handler: app,
};
