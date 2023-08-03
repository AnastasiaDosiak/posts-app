<template>
  <div class="container">
    <a-row>
      <a-col :span="12">
        <h1 class="mt-5 mb-3">Posts List</h1>
      </a-col>
      <a-col :span="12" class="col">
        <a-input-search
            v-model:value="store.searchValue"
            placeholder="search a post..."
            class="input"
            @change="setSearchValue($event.target.value)"
            @search="fetchPosts(0)"
        />
      </a-col>
    </a-row>
    <div class="spinner-border">
      <a-spin :spinning="store.pending" size="large" />
    </div>
    <template v-if="store.availablePosts.length > 0">
      <a-row :gutter="[24, 24]">
        <a-col :md="12" :lg="8" v-for="post in store.availablePosts" :key="post.id">
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
        <a-pagination  :showSizeChanger="false" :current="currentPage" :total="store.totalPosts" @change="handlePageChange" :pageSize="12" show-less-items />
      </div>
    </template>
    <template v-if="!store.pending && store.noData">
      <a-empty />
    </template>
  </div>
</template>


<script setup>
import {useCounterStore} from "~/stores/posts";
import {truncateText} from "~/utils/utils";
const store = useCounterStore();
const {setAvailablePosts, availablePosts, setSearchValue} = store
const router = useRouter();
const postsSkip = ref(0);
const currentPage = ref(1);

function redirectToPost(postId) {
  router.push(`/posts/${postId}`);
}
const fetchPosts = async (skip) => {
  await setAvailablePosts(skip);
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
  if (availablePosts.length === 0) {
    currentPage.value = 1; // Reset currentPage to 1 when there are no posts
  }
});
</script>

<style src="../assets/posts-list.css" scoped/>
