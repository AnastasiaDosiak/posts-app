import axios from 'axios';

export default async function (req: any, res: any) {
    try {
        if (req.method === 'GET') {
            if (req.url === '/posts') {
                const response = await axios.get('https://dummyjson.com/posts');
                const posts = response.data;
                return res.status(200).json(posts);
            } else if (req.url.startsWith('/posts/search')) {
                const query = req.query.q;
                const response = await axios.get(`https://dummyjson.com/posts/search?q=${query}`);
                const searchResults = response.data;
                return res.status(200).json(searchResults);
            } else if (req.url.startsWith('/posts/')) {
                const postId = req.url.replace('/posts/', '');
                const response = await axios.get(`https://dummyjson.com/posts/${postId}`);
                const post = response.data;
                return res.status(200).json(post);
            }
        }

        // If the endpoint is not matched, return 404
        return res.status(404).json({ error: 'Endpoint not found.' });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong.' });
    }
}
