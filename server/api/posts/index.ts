import {POSTS_API} from "~/utils/constants";

export async function getPosts(searchInputValue: string, skip: number) {
    try {
        const response = await $fetch(POSTS_API(searchInputValue, skip));
        return response;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }}
