<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
        <h1 class="mt-5 mb-3">Posts List</h1>
      </a-col>
      <a-col :span="12" class="col">
        <a-input-search
            v-model:value="searchInputRef"
            placeholder="search a post..."
            style="width: 500px;"
            @search="fetchPosts(0)"
        />
      </a-col>
    </a-row>
    <a-spin :spinning="pending" size="large" class="spinner-border" />
    <template v-if="posts.length > 0">
      <a-row :gutter="[24, 24]">
        <a-col :md="12" :lg="8" v-for="post in posts" :key="post.id">
          <a-card class="post-card" @click="redirectToPost(post.id)">
            <a-card-meta :title="post.title" :description="truncateText(post.body)">
              <template #avatar>
                <a-avatar src="https://picsum.photos/id/505/200/300" />
              </template>
            </a-card-meta>
            <a-tag v-for="tag in post.tags" :key="tag" color="pink">{{ tag }}</a-tag>
          </a-card>
        </a-col>
      </a-row>
      <div class="pagination">
        <a-pagination  :showSizeChanger="false" :current="currentPage" :total="totalPosts" @change="handlePageChange" :pageSize="12" show-less-items />
      </div>
    </template>
    <template v-if="!pending && posts.length === 0">
      <a-empty />
    </template>
  </div>
</template>


<script setup>
import {getPosts} from "~/server/api/posts";

const searchInputRef = ref('');
const router = useRouter();
const postsSkip = ref(0);
const currentPage = ref(1);
let posts = ref([]);
let totalPosts = ref(0);
let pending = ref(true);

function redirectToPost(postId) {
  router.push(`/posts/${postId}`);
}
const fetchPosts = async (skip) => {
  const response = await getPosts(searchInputRef.value, skip);
    totalPosts.value = response.total;
    posts.value = response.posts;
    pending.value = false;
};

const truncateText = (text) => {
  // Truncate the text and show an ellipsis
  return text.length > 100 ? `${text.slice(0, 100)}...` : text;
};


const handlePageChange = (newPage, pageSize) => {
  currentPage.value = newPage;
  postsSkip.value = (newPage - 1) * pageSize;
  fetchPosts(postsSkip.value)
};

onMounted(() => {
  fetchPosts(postsSkip.value);
});

onUpdated(() => {
  if (posts.length === 0) {
    currentPage.value = 1; // Reset currentPage to 1 when there are no posts
  }
});
</script>

<style src="assets/posts.css" scoped/>
