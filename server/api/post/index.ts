import { POST_BY_ID_API } from '~/utils/constants';

export async function getPostById(postId: string) {
  try {
    const response = await $fetch(POST_BY_ID_API(postId));
    return response;
  } catch (error) {
    console.error('Error fetching post:', error);
  }
}
