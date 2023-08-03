<template>
  <div class="container mt-4" v-if="!!store.activePost && !store.pending">
    <a-card class="post-card">
      <div class="post-content">
        <h1 class="mt-5 mb-3">{{ store.activePost.title }}</h1>
        <p class="body-text">{{ store.activePost.body }}</p>
        <div class="d-flex justify-content-between">
          <div class="tags">
            <a-tag v-for="tag in store.activePost.tags" :key="tag" color="pink">{{ tag }}</a-tag>
          </div>
          <div class="reactions">
            Reactions: {{ store.activePost.reactions }}
          </div>
        </div>
        <div class="user-info">
          <span class="user-info-text">By:</span>
          <a-avatar src="https://picsum.photos/id/505/200/300" />
        </div>
      </div>
    </a-card>
  </div>
  <div v-if="!store.pending && store.noData" class="container empty-container">
    <a-empty />
  </div>
</template>



<script setup>
import {useCounterStore} from "~/stores/posts";
const store = useCounterStore();
const { setActivePost } = store;
const route = useRoute()
const postIdInRoute = route.params.id;

onMounted(() => {
  if (postIdInRoute) {
    setActivePost(postIdInRoute);
  }
});

onBeforeUnmount(() => {
  // reset active post
  setActivePost('');
});
</script>

<style src="assets/post-details.css" scoped/>

