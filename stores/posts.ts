import { defineStore } from 'pinia';
import {getPosts} from "~/server/api/posts";
import {getPostById} from "~/server/api/post";

interface PostInterface {
    id: string;
    title: string;
    body: string;
    reactions: number;
    tags: string[];
}

export const usePostsStore = (getPostsApi = getPosts, getPostByIdApi = getPostById) => defineStore('posts', {
    state: () => ({
        availablePosts: [] as PostInterface[],
        activePost: null as PostInterface | null,
        totalPosts: 0,
        pending: true,
        noData: false,
        searchValue: ''
    }),
    actions: {
        setSearchValue(value: string) {
          this.searchValue = value;
        },
        async setAvailablePosts(skip: number) {
            const {posts, total} = await getPostsApi(this.searchValue, skip) as {posts: PostInterface[], total: number};
            this.availablePosts = posts;
            this.totalPosts = total;
            this.noData = posts.length === 0;
            this.pending = false;
        },
        async setActivePost(passedPostId: string) {
            let foundPost = this.availablePosts.find((post) => post.id === passedPostId);
            if (!foundPost) {
                foundPost = await getPostByIdApi(passedPostId) as PostInterface;
            }
            this.activePost = foundPost ?? null;
            this.pending = false;
            this.noData = !this.activePost;
        },
    },
});
