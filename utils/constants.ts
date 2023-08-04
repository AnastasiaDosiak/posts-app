export const POST_BY_ID_API = (id: string) =>
  `https://dummyjson.com/posts/${id}`;
export const POSTS_API = (searchInputValue: string, skip: number) =>
  `https://dummyjson.com/posts/search?q=${searchInputValue}&limit=12&skip=${skip}`;
