import { defineStore } from 'pinia';
import { getPosts } from '~/server/api/posts';
import { getPostById } from '~/server/api/post';

interface PostInterface {
  id: string;
  title: string;
  body: string;
  reactions: number;
  tags: string[];
  isError?: boolean;
}

interface GetPostsApiInterface {
  posts: PostInterface[];
  total: number;
  isError: boolean;
}

export const usePostsStore = (
  getPostsApi = getPosts,
  getPostByIdApi = getPostById
) =>
  defineStore('posts', {
    state: () => ({
      availablePosts: [] as PostInterface[],
      activePost: null as PostInterface | null,
      totalPosts: 0,
      pending: true,
      noData: false,
      searchValue: '',
      error: false,
    }),
    actions: {
      setSearchValue(value: string) {
        this.searchValue = value;
      },
      async setAvailablePosts(skip: number) {
        const response = (await getPostsApi(
          this.searchValue,
          skip
        )) as GetPostsApiInterface;
        this.error = !!response.isError;
        this.availablePosts = response.posts;
        this.totalPosts = response.total;
        this.noData = response.posts.length === 0;
        this.pending = false;
      },
      async setActivePost(passedPostId: string) {
        let foundPost = this.availablePosts.find(
          (post) => post.id === passedPostId
        );
        if (!foundPost) {
          foundPost = (await getPostByIdApi(passedPostId)) as PostInterface;
        }
        this.error = !!foundPost.isError;
        this.activePost = foundPost ?? null;
        this.pending = false;
        this.noData = !this.activePost;
      },
    },
  });
