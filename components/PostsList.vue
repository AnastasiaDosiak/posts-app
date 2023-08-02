<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
        <h1 class="mt-5 mb-3">Posts List</h1>
      </a-col>
      <a-col :span="12" style="display: flex; justify-content: flex-end; align-items: center;">
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
    <template v-else>
      <a-empty />
    </template>
  </div>
</template>


<script setup>
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
  try {
    const response = await $fetch(`https://dummyjson.com/posts/search?q=${searchInputRef.value}&limit=12&skip=${skip}`);
    totalPosts.value = response.total;
    posts.value = response.posts;
    pending.value = false;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
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
// Fetch initial posts on component mount
onMounted(() => {
  fetchPosts(postsSkip.value);
});

onUpdated(() => {
  if (posts.length === 0) {
    currentPage.value = 1; // Reset currentPage to 1 when there are no posts
  }
});
</script>

<style scoped>
.post-card {
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.post-card .ant-card-body {
  padding: 1rem;
}

.post-card .ant-card-meta-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.post-card .ant-card-meta-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.post-card .ant-card-meta-description {
  color: #555;
  margin-bottom: 1rem;
  /* Truncate the text and show an ellipsis */
  overflow: hidden;
  text-overflow: ellipsis;
  /* Set a fixed height to display only 2 lines */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.post-card .ant-card-actions {
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.post-card .ant-tag {
  margin-top: 1rem;
}

.pagination {
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 10px; /* Add some padding to make the content more readable on mobile */
  }
  .ant-row {
    flex-wrap: wrap; /* Make the row items wrap when the screen is small */
  }
  .ant-col {
    flex: 0 0 100%; /* Set the columns to have 100% width on mobile */
  }
  .ant-input-search {
    width: 100%; /* Set the input search width to 100% on mobile */
    margin-top: 10px; /* Add some space between title and input on mobile */
  }
}
</style>

